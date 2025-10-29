import { useState, useEffect, ChangeEvent } from "react";
import { TextareaStyleConfig } from "@/interfaces/textareaStyles";
import * as styles from "./textarea.m.scss";

interface TextareaProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  customStyles?: TextareaStyleConfig;
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

  const textareaStyles: React.CSSProperties = {
    fontSize: props.customStyles?.textarea?.fontSize,
    width: props.customStyles?.textarea?.width,
    minHeight: props.customStyles?.textarea?.minHeight,
    maxHeight: props.customStyles?.textarea?.maxHeight,
    padding: props.customStyles?.textarea?.padding,
    color: props.customStyles?.textarea?.color,
    border: props.customStyles?.textarea?.border,
    backgroundColor: props.customStyles?.textarea?.backgroundColor,
  };

  return (
    <>
      <div style={wrapperStyles}>
        <label htmlFor={props.name} style={labelStyles}>
          {props.label}
        </label>
        <textarea
          name={props.name}
          value={internalValue}
          onChange={(e) => setInternalValue(e.target.value)}
          style={textareaStyles}
          aria-invalid={!!props.error}
          aria-describedby={props.error ? `${props.name}-error` : undefined}
        />
      </div>
      {props.error && <span className={styles.errorMessage}>{props.error}</span>}
    </>
  );
}
