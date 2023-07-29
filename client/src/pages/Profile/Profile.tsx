import { useEffect, useState } from "react";
import { TUser } from "../../contexts/types";
import styled from "./styled";
import { AiOutlineUser } from "react-icons/ai";
import { useMainContext } from "../../contexts/MainContext";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import { getUser } from "../../services/api/User/getUser";
import { useUser } from "../../utils/hooks/useUser";
import { $ResponseData, IPost } from "../../types";
import { getPosts } from "../../services/api/Posts/getPosts";
import { follow, unfollow } from "../../services/api/User/manageFollow";
import { useAsyncFn } from "../../utils/hooks/useAsync";
import { useAuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const [profile, setProfile] = useState<null | TUser>(null);
  const [profilePosts, setProfilePosts] = useState<IPost[]>([]);
  const { execute: manageFollow } = useAsyncFn(follow);
  const { execute: manageUnfollow } = useAsyncFn(unfollow);
  const { postList } = useMainContext();
  const { user, setUser } = useUser();
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const showBackButton = !!queryParams.get("canGoBack");

  const [isFollowing, setIsFollowing] = useState(
    user?.followed.some((user) => user === username)
  );

  const isProfileOwner = user ? username === user.username : false;

  useEffect(() => {
    initUserProfile();
  }, [username]);

  const initUserProfile = async () => {
    if (!username) return;

    if (isProfileOwner) {
      setProfile(user);
      setProfilePosts(postList ?? []);
      return;
    }

    const [profileData, postsData] = await Promise.all([
      getUser(username),
      getPosts(username),
    ]);

    if (profileData.status === 200 && profileData.data)
      setProfile(profileData.data);

    if (postsData.status === 200 && postsData.data)
      setProfilePosts(postsData.data.posts);
  };

  const scrollToPosts = () => {
    const postList = document.getElementById("posts");

    if (postList) postList.scrollIntoView({ behavior: "smooth" });
  };

  const ownerPosts =
    profilePosts.filter((post) => post.owner === username) ?? [];

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!profile || !user) return;

    e.stopPropagation();
    if (!isFollowing) {
      const response: $ResponseData = await manageFollow(username);
      if (response.status !== 200) return;
      setIsFollowing(true);

      setUser((prevUser) => {
        if (!prevUser) return null;
        const updatedFollowed = [...(prevUser.followed || []), username!];

        return {
          ...prevUser,
          followed: updatedFollowed,
        };
      });

      profile.followers.push(user.username);

      setProfile({ ...profile });
    }

    if (isFollowing) {
      const response: $ResponseData = await manageUnfollow(username);
      if (response.status !== 200) return;
      setIsFollowing(false);

      setUser((prevUser) => {
        if (!prevUser) return null;
        const updatedFollowed = prevUser.followed.filter(
          (user) => user !== username
        );

        return {
          ...prevUser,
          followed: updatedFollowed,
        };
      });

      if (!profile) return;
      profile.followers = profile.followers.filter((u) => u !== user?.username);

      setProfile({ ...profile });
      return;
    }
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return profile ? (
    <styled.Container>
      <h1>
        Profile Overview <span className="username">| {profile.username}</span>
      </h1>
      <div className="profile-info">
        <span className="avatar">
          <AiOutlineUser />
        </span>
        <h2>@{profile.username}</h2>
        <section className="profile-details">
          <h3 onClick={scrollToPosts}>
            <span>{profile.postsUploaded}</span>
            <br />
            Posts
          </h3>
          <h3
            onClick={() => {
              scrollTop();
              navigate(`/profile/${username}/followers`);
            }}
          >
            <span>{profile?.followers.length}</span> <br />
            Followers
          </h3>
          <h3
            onClick={() => {
              scrollTop();
              navigate(`/profile/${username}/followed`);
            }}
          >
            <span>{profile.followed.length}</span>
            <br />
            Followed
          </h3>
        </section>
        {isProfileOwner ? (
          <section className="profile-actions">
            <Link onClick={scrollTop} to="/explore">
              Add friends
            </Link>
          </section>
        ) : (
          <section className="profile-actions">
            <button
              className={isFollowing ? "filled" : ""}
              onClick={handleFollow}
            >
              {isFollowing ? "Already following" : "Follow"}
            </button>
          </section>
        )}
      </div>

      <h3>
        {isProfileOwner ? (
          <>
            Your posts |{" "}
            <Link onClick={scrollTop} to="/">
              +New post
            </Link>
          </>
        ) : (
          `@${username}'s posts`
        )}
      </h3>
      <div className="post-list" id="posts">
        {ownerPosts.length ? (
          ownerPosts.map((post) => (
            <Link to={`/post/${post._id}`} key={post._id}>
              <Post {...post} />
            </Link>
          ))
        ) : (
          <p>No posts yet...</p>
        )}
      </div>
      {isProfileOwner && <LogoutButton />}

      {showBackButton && (
        <span onClick={() => navigate(-1)} className="back-button">
          ⬅️
        </span>
      )}
    </styled.Container>
  ) : (
    <p>
      Profile not found... <Link to="..">Back Home</Link>
    </p>
  );
};

export default Profile;
