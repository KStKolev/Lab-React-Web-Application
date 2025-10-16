import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../../elements/inputText";
import idCardIcon from "../../assets/images/icons/idCard.svg";
import padlockIcon from "../../assets/images/icons/padlock.svg";
import apiEndpoints from "../../api.endpoints";
import routes from "../../routes";
import { isStrongPassword } from "../../validation";
import * as styles from "./auth.m.scss";

interface SignUpErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  submitError?: string;
}

interface SignUpProps {
  onSignUpSuccess: () => void;
  signUp: (user: object) => void;
}

export default function SignUp(props: SignUpProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<SignUpErrors>({});
  const navigate = useNavigate();

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const validateInputs = () => {
    const newErrors: SignUpErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!isStrongPassword(password)) {
      newErrors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const response = await fetch(apiEndpoints.signUp, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());

    if (response.code === 201 && response.user) {
      resetForm();
      props.signUp(response.user);
      props.onSignUpSuccess();
      navigate(routes.PROFILE);
    } else if (response.code === 400) {
      setErrors({ submitError: response.error });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputText
        label="Login"
        name="username"
        type="text"
        iconUrl={idCardIcon}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
      />
      <InputText
        label="Password"
        name="password"
        type="password"
        value={password}
        iconUrl={padlockIcon}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <InputText
        label="Repeat Password"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        iconUrl={padlockIcon}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
      />
      {errors.submitError && <span className={styles.errorMessage}>{errors.submitError}</span>}
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
}
