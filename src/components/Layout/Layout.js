import React from 'react';
import Navbar from '../Layout/Navbar';
import styles from "./Layout.module.css";


const Layout = (props) => {
  return (
    <div>
          <Navbar />
          <main className={styles.main}>{ props.children}</main>
    </div>
  );
}

export default Layout