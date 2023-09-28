import React from "react";
import { StyledLoader } from "./styled";

const Loader = () => {
  return (
    <StyledLoader>
      <div className="backdrop" />
      {/* <div className="spinner" /> */}
      <div />
      <div />
      <div />
      <div />
    </StyledLoader>
  );
};

export default Loader;
