import type { InputStyleConfig } from "@/interfaces/inputStyles";

const commonInputFieldStyles = {
  fontSize: "1.1rem",
  width: "100%",
  color: "rgb(216, 216, 216)",
  border: "2px solid rgb(216, 216, 216)",
  backgroundColor: "rgba(0, 0, 0, 0.301)",
  padding: "1em 2.8em 1em 1.3em",
};

const commonWrapperStyles = {
  display: "flex",
  alignItems: "center",
};

const commonLabelStyles = {
  fontSize: "1.5rem",
  color: "rgb(216, 216, 216)",
};

const commonIconStyles = {
  position: "absolute",
  top: "50%",
  right: "5%",
  height: "20px",
  width: "20px",
  transform: "translateY(-50%)",
};

export const signInInputStyles: InputStyleConfig = {
  wrapper: commonWrapperStyles,
  label: { ...commonLabelStyles, flex: "0 0 250px" },
  inputField: commonInputFieldStyles,
  icon: commonIconStyles,
};

export const signUpInputStyles: InputStyleConfig = {
  wrapper: commonWrapperStyles,
  label: { ...commonLabelStyles, flex: "0 0 300px" },
  inputField: commonInputFieldStyles,
  icon: commonIconStyles,
};
