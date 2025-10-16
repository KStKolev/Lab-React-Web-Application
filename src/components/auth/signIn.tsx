import { useState } from "react";
import InputText from "../../elements/inputText";
import signInIcon from "../../assets/images/icons/signInInput.svg";
import apiEndPoints from "../../api.endpoints";
import * as styles from "./auth.m.scss";

interface SignInErrors {
  username?: string;
  password?: string;
  submitError?: string;
}

interface SignInProps {
  onSignInSuccess: () => void;
  signIn: (user: object) => void;
}

export default function SignIn(props: SignInProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<SignInErrors>({});

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setErrors({});
  };

  const validateInputs = () => {
    const newErrors: SignInErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
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
      <InputText
        label="Login"
        name="username"
        type="text"
        value={username}
        iconUrl={signInIcon}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
      />
      <InputText
        label="Password"
        name="password"
        type="password"
        value={password}
        iconUrl={signInIcon}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      {errors.submitError && <span className={styles.errorMessage}>{errors.submitError}</span>}
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
}
