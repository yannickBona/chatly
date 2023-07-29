import styled from "./styled";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  AiOutlineClose,
  AiOutlineEllipsis,
  AiOutlineMenu,
} from "react-icons/ai";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const [expand, setExpand] = useState(false);
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [showBoxShadow, setShowBoxShadow] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isSelected = (tabRoute: string) => {
    const currentRoute = location.pathname.split("/")[1];
    return currentRoute === tabRoute;
  };

  const manageNavbar = () => {
    window.scrollY > 50 ? setShowNavbar(false) : setShowNavbar(true);
    window.scrollY > 1 ? setShowBoxShadow(true) : setShowBoxShadow(false);

    if (window.scrollY < lastScrollY) setShowNavbar(true);
    console.log(window.scrollY, lastScrollY);
    setLastScrollY(window.scrollY);
  };

  // This is used to call the animations while scrolling
  useEffect(() => {
    window.addEventListener("scroll", manageNavbar, { passive: true });

    return () => window.removeEventListener("scroll", manageNavbar);
  }, [lastScrollY]);

  return (
    <styled.Container showNavbar={showNavbar} showBoxShadow={showBoxShadow}>
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

        <Link
          className="logout-button"
          onClick={() => {
            setExpand(false);
            localStorage.removeItem("token");
          }}
          to={`/login`}
        >
          Logout
        </Link>
      </div>
    </styled.Container>
  );
};

export default Navbar;
