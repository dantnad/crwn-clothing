import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

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
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
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
    </div>
  );
};

export default SignUpForm;
