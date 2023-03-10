import React from "react";
import { useRouteError } from "react-router-dom";

const Error404 = () => {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, we're unable to find the page you are looking for.</p>
    </div>
  );
};
export default Error404;
