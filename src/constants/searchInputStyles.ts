import type { InputStyleConfig } from "@/interfaces/inputStyles";

const commonFieldStyles = {
  fontSize: "1.2rem",
  width: "100%",
  color: "rgb(218, 218, 218)",
  border: "2px solid rgb(166, 166, 166)",
  backgroundColor: "rgba(0, 0, 0, 0.301)",
  padding: "0.8em 1.3em",
};

const commonIconStyles = {
  position: "absolute",
  top: "50%",
  right: "2%",
  height: "40px",
  width: "40px",
  transform: "translateY(-50%)",
};

export const homeSearchInputStyles: InputStyleConfig = {
  inputField: {
    ...commonFieldStyles,
    borderRadius: "1.5rem",
  },
  icon: commonIconStyles,
};

export const productSearchInputStyles: InputStyleConfig = {
  inputField: {
    ...commonFieldStyles,
    borderRadius: "1.3rem",
  },
  icon: commonIconStyles,
};
