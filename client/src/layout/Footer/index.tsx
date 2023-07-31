import React from "react";
import { StyledFooter } from "./styled";

const Footer = () => {
  return (
    <StyledFooter>
      This application is maintained and developed by{" "}
      <a href="https://github.com/yannickBona" target="_blank">
        @yannickBona
      </a>{" "}
      |{" "}
      <a href="https://github.com/yannickBona/chatly/issues" target="_blank">
        Leave some feedback 🚀
      </a>
    </StyledFooter>
  );
};

export default Footer;
