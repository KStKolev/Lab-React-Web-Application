import { LabelStyleConfig } from "./labelStyles";

export interface TextareaStyleConfig {
  label?: LabelStyleConfig;
  wrapper?: {
    display?: string;
    flexDirection?: string;
    gap?: string;
    alignItems?: string;
    justifyContent?: string;
  };
  textarea?: {
    fontSize?: string;
    width?: string;
    minHeight?: string;
    maxHeight?: string;
    padding?: string;
    color?: string;
    border?: string;
    backgroundColor?: string;
  };
}
