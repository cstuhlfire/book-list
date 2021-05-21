import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <a className="navbar-brand" href="#">Ultimate Book List</a>
        <div>
          <ul className="navbar-nav" style={{paddingLeft: 25}}>
            <li className="nav-item active">
              <Link className="nav-link" to="/">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/saved">Saved</Link>
            </li>
          </ul>
        </div>
      </nav>

  );
}

export default Nav;
