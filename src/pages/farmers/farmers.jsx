import React, { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/modal";
import Post from "./post";
import { useContext } from "react";
import { PostContext } from "../../Context/postContext";

import styles from "./farmers.styles.scss";

export const Farmers = () => {
  const { farmPosts } = useContext(PostContext);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setShow(false); //Closes form after user submits data
  }, [farmPosts]);

  const searchField = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <h1>Farmer's Market</h1>
      <input
        type="search"
        placeholder="search for a product or farm"
        onChange={searchField}
      />
      <button onClick={() => setShow(true)}>Add your farm</button>
      <Modal onClose={() => setShow(false)} show={show} />
      <div className="container">
        {farmPosts
          ? farmPosts.map((farm, index) => (
              <div className="test" key={farm.id}>
                <Post farm={farm} />
                {
                  (console.log("farmPosts", farmPosts),
                  farmPosts
                    .filter((farm) => {
                      if (search === "") {
                        return farm;
                      } else if (
                        farm.title.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return farm;
                      }
                    })
                    .map((farm, index) => (
                      <div className="Filtered" key={index}>
                        <Post farm={farm} />
                      </div>
                    )))
                }
              </div>
            ))
          : ""}
      </div>{" "}
    </>
  );
};
