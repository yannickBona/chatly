import React, { useEffect, useState } from "react";
import { StyledContainer } from "./styled";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import ProfileCard from "../../components/ProfileCard";
import { TUser } from "../../contexts/types";
import { getUser } from "../../services/api/User/getUser";

const UserList = ({ section }: { section: "followed" | "followers" }) => {
  const [profile, setProfile] = useState<null | TUser>(null);
  const { user } = useAuthContext();
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    initUserProfile();
  }, []);

  const initUserProfile = async () => {
    if (!username) return;

    if (username === user?.username) {
      setProfile(user);
      return;
    }

    const profileData = await getUser(username);

    if (profileData.status === 200 && profileData.data)
      setProfile(profileData.data);
  };

  const isFollowed = section === "followed";
  const usersList = isFollowed ? profile?.followed : profile?.followers;

  return (
    <StyledContainer>
      <h1>
        {isFollowed
          ? `${usersList?.length} Followed`
          : `${usersList?.length} Followers`}
      </h1>

      {usersList?.length ? (
        <div className="cards-container">
          {usersList.map((user) => (
            <ProfileCard username={user} />
          ))}
        </div>
      ) : (
        <p>
          The list is empty...
          <Link to="/explore"> Start interacting with some people!</Link>
        </p>
      )}

      <span onClick={() => navigate(-1)} className="back-button">
        ⬅️
      </span>
    </StyledContainer>
  );
};

export default UserList;
