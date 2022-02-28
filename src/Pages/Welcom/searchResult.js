import React from "react";
import { useState } from "react";
import { favActions } from "../../Store";
import { useDispatch } from "react-redux";

import Modal from "../../components/UI/Modal";
import styles from "./searchResult.module.css";

const SearchResult = (props) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [favItem, setFavItem] = useState(null);

  const AddToFavHandler = (item) => {
    //console.log(item);
    setShowModal(true);
    setFavItem(item);
  };
  const addHandler = () => {
    dispatch(favActions.addToFavList(favItem));
    setShowModal(false);
    alert("adding successfully");
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };

  //for paging
  const startIndex = (props.page - 1) * 10;
  const results = props.results.slice(startIndex, startIndex + 10);

  return (
    <div className={styles.container}>
      {showModal && <Modal onCancel={hideModalHandler} onAdd={addHandler} />}
      <h1>Search Results</h1>
      {props.results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Repository full name</th>
              <th>Owner</th>
              <th>Number of stars</th>
              <th>Link to the fork repository</th>
              <th>Add To Favourits</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.name}</td>
                <td>{result.owner.login}</td>
                <td>{result.stargazers_count}</td>
                <td>{result.forks_url}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      AddToFavHandler(result);
                    }}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchResult;
