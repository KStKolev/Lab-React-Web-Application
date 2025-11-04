import { LabelStyleConfig } from "./labelStyles";

export interface InputStyleConfig {
  label?: LabelStyleConfig;
  wrapper?: {
    display?: string;
    flexDirection?: string;
    gap?: string;
    alignItems?: string;
    justifyContent?: string;
  };
  inputField?: {
    fontSize?: string;
    width?: string;
    padding?: string;
    color?: string;
    border?: string;
    borderRadius?: string;
    backgroundColor?: string;
  };
  icon?: {
    position?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    height?: string;
    width?: string;
    transform?: string;
  };
}
