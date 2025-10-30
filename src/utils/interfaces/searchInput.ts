import { RefObject } from "react";
import { InputStyleConfig } from "../inputStyles";

export interface SearchInputProps {
  value: string;
  placeholder: string;
  results?: string[];
  showDropdown?: boolean;
  focusedIndex?: number;
  loading?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  dropdownRef?: RefObject<HTMLDivElement | null>;
  customStyles?: InputStyleConfig;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onItemClick?: (item: string) => void;
}
