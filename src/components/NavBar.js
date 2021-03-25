import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Link to="/" exact>
        Home
      </Link>
      {" - "}
      <Link to="/about">About</Link>
      {" - "}
      <Link to="/discover">Discover</Link>
    </div>
  );
}
