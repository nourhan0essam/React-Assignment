import React from "react";

import styles from "./Pagination.module.css";
import Card from './Card';

const Pagination = ({ totalPages, handleClick }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);
  return (
    <Card>
          <div className={styles.container}>
              <p>search pages</p>
        {pages.map((num) => (
          <button key={num} onClick={() => handleClick(num)}>
            P : {num}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default Pagination;
