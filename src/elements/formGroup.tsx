import { ReactNode } from "react";
import * as styles from "./formGroup.m.scss";

interface FormGroupProps {
  children: ReactNode;
}

export default function FormGroup(props: FormGroupProps) {
  return <div className={styles.formGroup}>{props.children}</div>;
}
