// React Imports
import { useState } from "react";
// Component Imports
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
// Utils Imports
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
//Stylesheet Imports
import { SignUp } from "./sign-up-form.styles.jsx";

//Setting empty form fields as initial state
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  // FORM FUNCTIONALITY MANAGEMENT
  // State tracking of the values in the forms
  const [formFields, setFormFields] = useState(defaultFormFields);
  // Form value destructuring for usage
  const { displayName, email, password, confirmPassword } = formFields;
  //Handle form value submissions
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  // Handle form submissions
  const handleSubmit = async (event) => {
    //Prevent default form submit behaviour
    event.preventDefault();
    //If their passwords do not match, stop the submission and alert them
    if (password !== confirmPassword) {
      alert("Passwords are not the same");
      return;
    }
    //If passwords do match, start user creation
    try {
      //Create a user using Firebase Authentication with Email and Password
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      // If for some reason we don't get back an user, we throw and error and stop user database creation
      if (!user) throw new Error("No user was given back", user);
      // Once Firebase Auth User has been created, create the user's database
      createUserDocumentFromAuth(user, {
        displayName,
      });
      alert("User creation was successful");
      //Reset the form fields
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create this user, the email is already in use");
      }
      console.error("There was an error", error.message);
    }
  };

  // Return functional component
  return (
    <SignUp>
      <span>Don't have an account?</span>
      <h2>Sign up with your email and password</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          onChange={handleChange}
          required
          type="text"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          required
          type="password"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUp>
  );
};

export default SignUpForm;
