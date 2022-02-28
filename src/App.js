import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { favActions } from "./Store";

import Favourit from "./Pages/Favourit/Favourit";
import Layout from "./components/Layout/Layout";
import WelcomePage from "./Pages/Welcom/WelcomePage";

function App() {
  const dispatch = useDispatch();
  const favList = useSelector((state) => state.favlist);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-assignment-c49ce-default-rtdb.firebaseio.com/favlist.json"
      );
      const data = await response.json();

      const LoadedFavList = [];
      for (const key in data) {
        LoadedFavList.push({
          id: data[key].id,
          fullName: data[key].fullName,
          owner: data[key].owner,
          numberOfStars: data[key].numberOfStars,
          link: data[key].link,
        });
      }

      dispatch(favActions.replaceFavlist(LoadedFavList));
      //console.log(LoadedFavList);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    fetch(
      "https://react-assignment-c49ce-default-rtdb.firebaseio.com/favlist.json",
      {
        method: "PUT",
        body: JSON.stringify(favList),
      }
    );
  }, [favList]);

  return (
    <Layout>
      <Routes>
        <Route path="/Home" element={<WelcomePage />} />
        <Route path="/Favourits" element={<Favourit />} />
        <Route path="/" element={<WelcomePage />} exact />
      </Routes>
    </Layout>
  );
}

export default App;
