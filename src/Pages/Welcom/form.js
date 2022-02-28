import React, { useState, useCallback } from "react";

import SearchResult from "./searchResult";
import Card from "../../components/UI/Card";
import Pagination from "../../components/UI/Pagination";
import styles from "./form.module.css";

const { Octokit } = require("@octokit/core");

function Form() {
  const [searchInput, setSearchInput] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //for paging
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const setInputHandler = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  const searchHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const octokit = new Octokit();
      let repository = searchInput.substring(searchInput.indexOf(":") + 1);
      let owner = searchInput.split("/")[0];
      const response = await octokit.request(
        `GET /repos/${owner}/${repository}/forks`
      );
      const data = await response.data;
      setFetchedData(data);
      //for paging
      setTotalPages(Math.ceil(data.length / 10));
      //console.log(data[0]);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      setFetchedData([]);
      setErrorMessage(error.message);
      //console.log(error.message);
    }
  }, [searchInput]);

  //for paging
  const handleClick = (num) => {
    setPage(num);
  };

  return (
    <React.Fragment>
      <Card>
        <div className={styles.container}>
          <input
            type="search"
            placeholder="Owner/:repoName"
            onChange={setInputHandler}
            value={searchInput}
          />
          <button type="button" onClick={searchHandler}>
            Search
          </button>
        </div>
      </Card>
      {isLoading && <div className={styles.loading}>Loading .......</div>}
      {!isLoading && error && (
        <div className={styles.loading}>{errorMessage}</div>
      )}
      {!isLoading && fetchedData.length > 0 && (
        <div>
          <SearchResult results={fetchedData} page={page} />
          <Pagination totalPages={totalPages} handleClick={handleClick} />
        </div>
      )}
    </React.Fragment>
  );
}

export default Form;
