import React from "react";
import styled from "./styled";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isSelected = (route: string) => {
    return location.pathname === route;
  };
  return (
    <styled.Container>
      <Link to="/" className="logo">
        Chatly
      </Link>
      <div className="nav-options">
        <Link className={isSelected("/") ? "selected" : ""} to="/">
          Feed
        </Link>
        <Link
          className={isSelected("/explore") ? "selected" : ""}
          to="/explore"
        >
          Explore
        </Link>
        <Link
          className={isSelected("/profile") ? "selected" : ""}
          to="/profile"
        >
          Profile
        </Link>
      </div>
    </styled.Container>
  );
};

export default Navbar;
