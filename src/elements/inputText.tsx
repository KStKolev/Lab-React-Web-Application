import { ChangeEvent } from "react";
import * as styles from "./inputText.m.scss";

interface InputTextProps {
  label: string;
  type: "text" | "email" | "password" | "search" | "number";
  value: string;
  name: string;
  error?: string;
  iconUrl: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputText(props: InputTextProps) {
  return (
    <>
      <div className={styles.inputWrapper}>
        <label htmlFor={props.name} className={styles.label}>
          {props.label}
        </label>
        <div className={styles.iconWrapper}>
          <input
            type={props.type}
            className={styles.inputField}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            aria-invalid={!!props.error}
            aria-describedby={props.error ? `${props.name}-error` : undefined}
          />
          <img src={props.iconUrl} alt={`${props.label}-icon`} className={styles.inputIcon} />
        </div>
      </div>
      {props.error && <span className={styles.errorMessage}>{props.error}</span>}
    </>
  );
}
