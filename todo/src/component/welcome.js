import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <h1>hello to my app</h1>
      <Link to="register">register page</Link>
    </div>
  );
};

export default Welcome;
