import React from "react";
import { useState } from "react";
import { FormInput } from "../form-input/form-input";
import {
  createUserProfileDocument,
  getFirebase,
} from "../../firebase/firebase.utils";
import { auth } from "../../firebase/firebase.utils";
import { createUserWithEmailandPassword } from "../../firebase/firebase.utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = user;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match", {
        position: "top-center",
      });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      createUserProfileDocument(user, { email });

      setUser({
        email: "",
        password: "",
        confirmPassword: "",
      }); //This will clear the form
    } catch (error) {
      console.error(error);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="sign-up">
      <ToastContainer />
      <h2>I do not have an account </h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          required
          label="Password"
        />
        <FormInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          handleChange={handleChange}
          required
          label="Confirm Password"
        />
        <div className="buttons">
          <button type="submit" className="sign-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
