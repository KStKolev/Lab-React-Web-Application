import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpInputStyles } from "@/constants/authInputStyles";
import { useSignUpValidation } from "@/customHooks/useAuthValidation";
import Input from "@/elements/input";
import routes from "@/routes";
import apiEndpoints from "@/api.endpoints";
import padlockIcon from "@/assets/images/icons/padlock.svg";
import idCardIcon from "@/assets/images/icons/idCard.svg";
import * as styles from "./auth.m.scss";

interface SignUpProps {
  onSignUpSuccess: () => void;
  signUp: (user: object) => void;
}

export default function SignUp(props: SignUpProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { errors, validateInputs, setErrors } = useSignUpValidation();
  const navigate = useNavigate();

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs(username, password, confirmPassword)) {
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
      <Input
        label="Login"
        name="username"
        type="text"
        iconUrl={idCardIcon}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
        customStyles={signUpInputStyles}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={password}
        iconUrl={padlockIcon}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        customStyles={signUpInputStyles}
      />

      <Input
        label="Repeat Password"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        iconUrl={padlockIcon}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        customStyles={signUpInputStyles}
      />

      {errors.submitError && <span className={styles.errorMessage}>{errors.submitError}</span>}
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
}
