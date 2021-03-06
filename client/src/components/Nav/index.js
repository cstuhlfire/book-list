import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <Link className="navbar-brand" to="/">Ultimate Book List</Link>
        <div>
          <ul className="navbar-nav" style={{paddingLeft: 25}}>
            <li className="nav-itemnp">
              <Link className="nav-link" to="/">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/saved">Saved</Link>
            </li>
          </ul>
        </div>
      </nav>

  );
}

export default Nav;
