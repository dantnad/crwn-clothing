import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { Authentication } from "./authentication.styles.jsx";

const AuthenticationPage = () => {
  return (
    <Authentication>
      <SignInForm />
      <SignUpForm />
    </Authentication>
  );
};

export default AuthenticationPage;
