import { FormGroup, FormInput, FormLabel } from "./form-input.styles.jsx";

const FormInputGroup = ({ label, ...otherProps }) => {
  return (
    <FormGroup>
      <FormInput {...otherProps} />
      {label && (
        <FormLabel
          htmlFor={FormInput}
          className={otherProps.value.length}
          shrink={otherProps.value.length ? true : false}
        >
          {label}
        </FormLabel>
      )}
    </FormGroup>
  );
};

export default FormInputGroup;
