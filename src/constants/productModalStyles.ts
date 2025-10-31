import type { InputStyleConfig } from "@/interfaces/inputStyles";
import type { TextareaStyleConfig } from "@/interfaces/textareaStyles";

const commonFieldStyles = {
  fontSize: "1.1rem",
  width: "100%",
  color: "rgb(218, 218, 218)",
  border: "2px solid rgb(166, 166, 166)",
  backgroundColor: "rgba(0, 0, 0, 0.301)",
  padding: "0.9em 1.3em 0.9em 1em",
};

const commonWrapperStyles = {
  display: "flex",
  alignItems: "center",
};

const commonLabelStyles = {
  flex: "0 0 130px",
  fontSize: "1.3rem",
};

const commonIconStyles = {
  position: "absolute",
  top: "50%",
  right: "5%",
  height: "20px",
  width: "20px",
  transform: "translateY(-50%)",
};

export const productInputStyles: InputStyleConfig = {
  wrapper: commonWrapperStyles,
  label: commonLabelStyles,
  inputField: commonFieldStyles,
};

export const productTextareaStyles: TextareaStyleConfig = {
  wrapper: commonWrapperStyles,
  label: commonLabelStyles,
  textarea: {
    ...commonFieldStyles,
    minHeight: "350px",
    maxHeight: "600px",
  },
};

export const productInputWithIconStyles: InputStyleConfig = {
  wrapper: commonWrapperStyles,
  label: commonLabelStyles,
  inputField: commonFieldStyles,
  icon: commonIconStyles,
};
