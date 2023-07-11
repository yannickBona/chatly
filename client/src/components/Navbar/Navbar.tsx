import React, { useContext } from "react";
import styled from "./styled";
import { Link, useLocation } from "react-router-dom";
import { IAuthContext } from "../../contexts/types";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user } = useContext<IAuthContext>(AuthContext);

  const isSelected = (tabRoute: string) => {
    const currentRoute = location.pathname.split("/")[1];
    return currentRoute === tabRoute;
  };
  return (
    <styled.Container>
      <Link to="/" className="logo">
        Chatly
      </Link>
      <div className="nav-options">
        <Link className={isSelected("") ? "selected" : ""} to="/">
          Feed
        </Link>
        <Link className={isSelected("explore") ? "selected" : ""} to="/explore">
          Explore
        </Link>
        <Link
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
