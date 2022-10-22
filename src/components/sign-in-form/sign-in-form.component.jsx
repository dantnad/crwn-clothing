//React Imports
import { useState } from "react";
//Components Imports
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
//Utils Imports
import {
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
//Stylesheet imports
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = ({ ...otherProps }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    //Prevent default form submit behaviour
    event.preventDefault();
    try {
      //Sign in a user using Firebase Authentication with Email and Password
      const { user } = await signInUserWithEmailAndPassword(email, password);
      // If for some reason we don't get back an user, we throw and error and stop user database creation
      if (!user) throw new Error("No user was given back", user);
      // Once Firebase Auth User has authenticated the user, alert a successful login
      alert("Login Successful");
      //Reset the form fields
      setFormFields(defaultFormFields);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("User does not exist");
          break;

        case "auth/wrong-password":
          alert("Wrong user/password combination");
          break;
        default:
          console.error("Unexpected error", error.code, error.message);
          break;
      }
      console.error("There was an error", error.message);
    }
  };

  const logGoogleUser = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.error("There was an error", error.code, error.message);
    }
  };

  return (
    <div className="sign-in-container">
      <span>I already have an account</span>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleChange}
          name="email"
          label="Email"
          required
          type="email"
          value={email}
        />
        <FormInput
          label="Password"
          name="password"
          onChange={handleChange}
          required
          type="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
