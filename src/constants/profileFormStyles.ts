import type { InputStyleConfig } from "@/interfaces/inputStyles";
import type { TextareaStyleConfig } from "@/interfaces/textareaStyles";

const commonFieldStyles = {
  fontSize: "1rem",
  width: "100%",
  color: "rgb(216, 216, 216)",
  border: "2px solid rgb(216, 216, 216)",
  backgroundColor: "rgba(0, 0, 0, 0.301)",
  padding: "1em 2.5em 1em 1.3em",
};

const commonWrapperStyles = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "1em",
};

const commonLabelStyles = {
  fontSize: "1.5rem",
  color: "rgb(216, 216, 216)",
};

export const profileInputStyles: InputStyleConfig = {
  wrapper: commonWrapperStyles,
  label: commonLabelStyles,
  inputField: commonFieldStyles,
  icon: {
    position: "absolute",
    top: "50%",
    right: "5%",
    height: "20px",
    width: "20px",
    transform: "translateY(-50%)",
  },
};

export const profileTextareaStyles: TextareaStyleConfig = {
  wrapper: commonWrapperStyles,
  label: commonLabelStyles,
  textarea: {
    ...commonFieldStyles,
    minHeight: "200px",
    maxHeight: "600px",
  },
};
