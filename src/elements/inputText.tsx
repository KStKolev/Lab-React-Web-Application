import { ChangeEvent, useEffect, useState } from "react";
import * as styles from "./inputText.m.scss";

interface InputTextProps {
  label: string;
  type: "text" | "email" | "password" | "search" | "number";
  value: string;
  name: string;
  error?: string;
  iconUrl: string;
  vertical?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputText(props: InputTextProps) {
  const [internalValue, setInternalValue] = useState(props.value);

  useEffect(() => {
    setInternalValue(props.value);
  }, [props.value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (internalValue !== props.value) {
        props.onChange({
          target: { name: props.name, value: internalValue },
        } as ChangeEvent<HTMLInputElement>);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [internalValue, props.onChange]);

  return (
    <div className={!props.vertical ? styles.inputWrapper : styles.inputWrapperVertical}>
      <label htmlFor={props.name} className={styles.label}>
        {props.label}
      </label>
      <div className={!props.vertical ? styles.inputContainer : styles.inputContainerVertical}>
        <div className={styles.iconWrapper}>
          <input
            type={props.type}
            className={styles.inputField}
            name={props.name}
            value={internalValue}
            onChange={(e) => setInternalValue(e.target.value)}
            aria-invalid={!!props.error}
            aria-describedby={props.error ? `${props.name}-error` : undefined}
          />
          <img src={props.iconUrl} alt={`${props.label}-icon`} className={styles.inputIcon} />
        </div>
        {props.error && <span className={styles.errorMessage}>{props.error}</span>}
      </div>
    </div>
  );
}
