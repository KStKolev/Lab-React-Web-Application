import { useState, useEffect, ChangeEvent } from "react";
import * as styles from "./textarea.m.scss";

interface TextareaProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  vertical?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea(props: TextareaProps) {
  const [internalValue, setInternalValue] = useState(props.value);

  useEffect(() => {
    setInternalValue(props.value);
  }, [props.value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (internalValue !== props.value) {
        props.onChange({
          target: { name: props.name, value: internalValue },
        } as ChangeEvent<HTMLTextAreaElement>);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [internalValue, props.onChange]);

  return (
    <>
      <div className={!props.vertical ? styles.textareaWrapper : styles.textareaWrapperVertical}>
        <label htmlFor={props.name} className={styles.label}>
          {props.label}
        </label>
        <textarea
          name={props.name}
          className={`${styles.textarea}`}
          value={internalValue}
          onChange={(e) => setInternalValue(e.target.value)}
          aria-invalid={!!props.error}
          aria-describedby={props.error ? `${props.name}-error` : undefined}
        />
      </div>
      {props.error && <span className={styles.errorMessage}>{props.error}</span>}
    </>
  );
}
