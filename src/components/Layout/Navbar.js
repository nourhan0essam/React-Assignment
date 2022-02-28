import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.logo}>Github</div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink to="/Home" >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Favourits" >
                Favourits
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
