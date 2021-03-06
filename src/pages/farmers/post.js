import React from "react";
import { useState, useEffect } from "react";
import { FormInput } from "../../components/form-input/form-input";
import { getFirebase } from "../../firebase/firebase.utils";
import { createUserProfileDocument, auth } from "../../firebase/firebase.utils";

import styles from "./modal.styles.scss";

export default function Post(props, { farm, userId }) {
  const [currentUser, setCurrentUser] = useState();
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.on("value", (snapShot) => {
          setCurrentUser({ key: snapShot.key, ...snapShot.val() });
        });
      }
      if (setCurrentUser(userAuth)) {
      } else if (!userAuth && typeof window !== "undefined") {
        return null;
      }

      const uid = userAuth.uid;
      setId(uid);
    });
  }, []);

  const postKey = props.farm.postKey;
  console.log(id);

  const DeletePost = () => {
    getFirebase()
      .database()
      .ref(`Users/Posts/`)
      .child(`${id}`)
      .child(`${postKey}`)
      .remove();
  };

  const EditModal = (props) => {
    const initialFieldValues = {
      title: props.farm.title,
      image: props.farm.image,
      product: props.farm.product,
      content: props.farm.content,
      phone: props.farm.phone,
      email: props.farm.email,
    };
    const [values, setValues] = useState(initialFieldValues);

    function handleChange(e) {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    }

    const updatePost = (e) => {
      e.preventDefault();
      const obj = {
        ...values,
      };
      const postKey = props.farm.postKey;
      getFirebase()
        .database()
        .ref(`Users/Posts/`)
        .child(`${id}`)
        .child(`${postKey}`)
        .update(obj, (err) => {
          if (err) console.log(err);
        });
    };

    if (!props.show) {
      return null;
    }

    return (
      <>
        <div className="modal">
          <h1>Update your information</h1>
          <form onSubmit={updatePost}>
            <FormInput
              id="title"
              label="Title"
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Image"
              name="image"
              type="text"
              value={values.image}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Product"
              name="product"
              type="text"
              value={values.product}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Describe your products"
              name="content"
              type="text"
              value={values.content}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Phone"
              name="phone"
              type="number"
              value={values.phone}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              required
            />
            <div className="buttons">
              <button type="submit" value="save" onSubmit={props.onClose}>
                Update
              </button>
              <button onClick={props.onClose}>Close</button>
            </div>
          </form>
        </div>
      </>
    );
  };

  return (
    <div id={props.farm.id}>
      <h2>{props.farm.title}</h2>
      <img className="img" src={props.farm.image}></img>
      <h3>Products: {props.farm.product}</h3>
      <p>{props.farm.content}</p>
      <p>Phone: {props.farm.phone}</p>
      <p>{props.farm.email}</p>
      <div className="delete-up">
        {currentUser ? (
          <button onClick={() => setShow(true)}>Update your information</button>
        ) : (
          ""
        )}
        <EditModal
          farm={props.farm}
          onClose={() => setShow(false)}
          show={show}
        />
        {currentUser ? (
          <div>
            <button
              onClick={DeletePost}
              className="delete"
              id={props.farm.id}
              key={props.farm.id}
            >
              Delete Post
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
