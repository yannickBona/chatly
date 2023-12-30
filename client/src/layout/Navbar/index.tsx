import styled from "./styled";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  AiOutlineClose,
  AiOutlineEllipsis,
  AiOutlineMenu,
} from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const [expand, setExpand] = useState(false);

  const isSelected = (tabRoute: string) => {
    const currentRoute = location.pathname.split("/")[1];
    return currentRoute === tabRoute;
  };

  return (
    <styled.Container>
      <Link to="/" className="logo">
        Chatly
      </Link>
      {!expand ? (
        <AiOutlineMenu
          onClick={() => setExpand((prev) => !prev)}
          className="hamburger"
        />
      ) : (
        <AiOutlineClose
          onClick={() => setExpand((prev) => !prev)}
          className="hamburger"
        />
      )}
      <div className={`nav-options ${expand ? "expanded" : ""}`}>
        <Link
          onClick={() => setExpand(false)}
          className={isSelected("") ? "selected" : ""}
          to="/"
        >
          Feed
        </Link>
        <Link
          onClick={() => setExpand(false)}
          className={isSelected("explore") ? "selected" : ""}
          to="/explore"
        >
          Explore
        </Link>
        <Link
          onClick={() => setExpand(false)}
          className={isSelected("profile") ? "selected" : ""}
          to={`/profile/${user?.username}`}
        >
          Profile
        </Link>
      </div>
    </styled.Container>
  );
};

export default Navbar;
