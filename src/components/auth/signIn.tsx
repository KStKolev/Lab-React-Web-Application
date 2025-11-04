import { useState } from "react";
import { signInInputStyles } from "@/constants/authInputStyles";
import { useSignInValidation } from "@/customHooks/useAuthValidation";
import Input from "@/elements/input";
import apiEndPoints from "@/api.endpoints";
import signInIcon from "@/assets/images/icons/signInInput.svg";
import * as styles from "./auth.m.scss";

interface SignInProps {
  onSignInSuccess: () => void;
  signIn: (user: object) => void;
}

export default function SignIn(props: SignInProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { errors, validateInputs, setErrors } = useSignInValidation();

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs(username, password)) {
      return;
    }

    const response = await fetch(apiEndPoints.signIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());

    if (response.code === 200 && response.user) {
      resetForm();
      props.signIn(response.user);
      props.onSignInSuccess();
    } else if (response.code === 401) {
      setErrors({ submitError: response.error });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Login"
        name="username"
        type="text"
        value={username}
        iconUrl={signInIcon}
        onChange={(e) => setUsername(e.target.value)}
        customStyles={signInInputStyles}
        error={errors.username}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={password}
        iconUrl={signInIcon}
        onChange={(e) => setPassword(e.target.value)}
        customStyles={signInInputStyles}
        error={errors.password}
      />

      {errors.submitError && <span className={styles.errorMessage}>{errors.submitError}</span>}

      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
}
