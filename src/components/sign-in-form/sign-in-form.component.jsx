import FormInput from "../form-input/form-input.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import { useState } from "react";
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

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
      //Create a user using Firebase Authentication with Email and Password
      const { user } = await signInUserWithEmailAndPassword(email, password);
      // If for some reason we don't get back an user, we throw and error and stop user database creation
      if (!user) throw new Error("No user was given back", user);
      // Once Firebase Auth User has been created, create the user's database
      alert("Login Successful");
      //Reset the form fields
      setFormFields(defaultFormFields);
    } catch (error) {
      error.code === "auth/user-not-found" && alert("Username doesn't exist");
      error.code === "auth/wrong-password" &&
        alert("Wrong user/password combination");
      console.error("There was an error", error.message);
    }
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
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
        <Button type="submit">Sign In</Button>
        <Button buttonType="google" onClick={logGoogleUser}>
          Sign In With Google
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
