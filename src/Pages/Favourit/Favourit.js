import React from 'react';
import { useSelector } from "react-redux";

import Card from '../../components/UI/Card';
import styles from "./Favourit.module.css";

const Favourit = () => {
  const list = useSelector((state) => state.favlist);

    return (
      <Card>
        <div className={styles.container}>
          <h1>Favourit List</h1>
          {list && (
            <div>
              {list.map((item) => (
                <ul key={item.id}>
                  <li>fullName : {item.fullName}</li>
                  <li>owner : {item.owner}</li>
                  <li>numberOfStars : {item.numberOfStars}</li>
                  <li>link : {item.link}</li>
                </ul>
              ))}
            </div>
          )}
        </div>
      </Card>
    );
}

export default Favourit;


