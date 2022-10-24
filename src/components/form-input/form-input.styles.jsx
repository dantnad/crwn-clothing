import styled from "styled-components";

export const colors = {
  subColor: "grey",
  mainColor: "black",
};

export const shrinkLabel = `
  top: -14px;
  font-size: 12px;
  color: ${colors.mainColor};
`;

export const FormLabel = styled.label`
  color: ${colors.subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  &.shrink {
    ${shrinkLabel};
  }
`;

export const FormGroup = styled.div`
  position: relative;
  margin: 45px 0;
`;

export const FormInput = styled.input`
  background: none;
  background-color: white;
  color: ${colors.subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${colors.subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ .${FormLabel} {
    ${shrinkLabel};
  }
`;

export const FormPassword = styled.input.attrs({
  type: "password",
})`
  letter-spacing: 0.3em;
`;
