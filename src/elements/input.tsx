import { ChangeEvent, useEffect, useState, forwardRef, KeyboardEvent, FocusEvent } from "react";
import { isValidPrice } from "@/utils/validationUtils";
import { InputStyleConfig } from "@/interfaces/inputStyles";
import * as styles from "./input.m.scss";

interface InputProps {
  label?: string;
  type: "text" | "password" | "number";
  value?: string;
  name: string;
  iconUrl?: string;
  error?: string;
  placeholder?: string;
  customStyles?: InputStyleConfig;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [internalValue, setInternalValue] = useState(props.value);

  useEffect(() => {
    setInternalValue(props.value);
  }, [props.value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (props.name === "price") {
      if (value === "") {
        setInternalValue("0");
        return;
      }

      if (!isValidPrice(value)) {
        return;
      }
    }

    setInternalValue(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (internalValue !== props.value && props.onChange) {
        props.onChange({
          target: { name: props.name, value: internalValue },
        } as ChangeEvent<HTMLInputElement>);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [internalValue, props.onChange]);

  const labelStyles: React.CSSProperties = {
    fontSize: props.customStyles?.label?.fontSize,
    color: props.customStyles?.label?.color,
    fontWeight: props.customStyles?.label?.fontWeight,
    flex: props.customStyles?.label?.flex,
  };

  const wrapperStyles: React.CSSProperties = {
    display: props.customStyles?.wrapper?.display,
    flexDirection: props.customStyles?.wrapper?.flexDirection as React.CSSProperties["flexDirection"],
    gap: props.customStyles?.wrapper?.gap,
    alignItems: props.customStyles?.wrapper?.alignItems,
    justifyContent: props.customStyles?.wrapper?.justifyContent,
  };

  const inputStyles: React.CSSProperties = {
    fontSize: props.customStyles?.inputField?.fontSize,
    width: props.customStyles?.inputField?.width,
    padding: props.customStyles?.inputField?.padding,
    color: props.customStyles?.inputField?.color,
    border: props.customStyles?.inputField?.border,
    borderRadius: props.customStyles?.inputField?.borderRadius,
    backgroundColor: props.customStyles?.inputField?.backgroundColor,
  };

  const iconStyles: React.CSSProperties = {
    position: props.customStyles?.icon?.position as React.CSSProperties["position"],
    top: props.customStyles?.icon?.top,
    left: props.customStyles?.icon?.left,
    right: props.customStyles?.icon?.right,
    bottom: props.customStyles?.icon?.bottom,
    height: props.customStyles?.icon?.height,
    width: props.customStyles?.icon?.width,
    transform: props.customStyles?.icon?.transform,
  };

  return (
    <div style={wrapperStyles}>
      {props.label && (
        <label htmlFor={props.name} style={labelStyles}>
          {props.label}
        </label>
      )}
      <div className={styles.inputContainer}>
        <div className={styles.iconWrapper}>
          <input
            ref={ref}
            type={props.type}
            name={props.name}
            value={internalValue}
            placeholder={props.placeholder}
            onChange={handleInputChange}
            onKeyDown={props.onKeyDown}
            onFocus={props.onFocus}
            style={inputStyles}
            aria-invalid={!!props.error}
            aria-describedby={props.error ? `${props.name}-error` : undefined}
          />
          {props.iconUrl && <img src={props.iconUrl} alt={`${props.label}-icon`} style={iconStyles} />}
        </div>
        {props.error && <span className={styles.errorMessage}>{props.error}</span>}
      </div>
    </div>
  );
});

export default Input;
