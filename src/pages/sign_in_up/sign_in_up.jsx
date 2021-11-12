import react from "react";
import { SignIn } from "../../components/Sign-in/sign-in";
import { SignUp } from "../../components/Sign-up/sign_up";

import styles from "./sign_in_up.styles.scss";

export const SignInSignUp = ({ newId }) => (
  <div className="sign-in-up">
    {console.log("newId", newId.current)}

    <SignIn />
    <SignUp />
  </div>
);
