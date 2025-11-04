import { useState } from "react";
import { signUpInputStyles } from "@/constants/authInputStyles";
import { useChangePasswordValidation } from "@/customHooks/useAuthValidation";
import useAuth from "@/customHooks/useAuth";
import Input from "@/elements/input";
import apiEndPoints from "@/api.endpoints";
import passwordIcon from "@/assets/images/icons/padlock.svg";
import * as styles from "./auth.m.scss";

interface ChangePasswordProps {
  onChangePasswordSuccess: () => void;
}

export default function ChangePassword(props: ChangePasswordProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { errors, validateInputs, setErrors } = useChangePasswordValidation();
  const { user, updateUser } = useAuth();

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs(oldPassword, newPassword, user?.password || "")) {
      return;
    }

    const response = await fetch(apiEndPoints.changePassword, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, oldPassword, newPassword }),
    }).then((res) => res.json());

    if (response.code === 200) {
      updateUser(response.updatedUser);
      resetForm();
      props.onChangePasswordSuccess();
    } else if (response.code === 400) {
      setErrors({ submitError: response.error });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Password"
        name="password"
        type="password"
        value={oldPassword}
        iconUrl={passwordIcon}
        onChange={(e) => setOldPassword(e.target.value)}
        customStyles={signUpInputStyles}
        error={errors.oldPassword}
      />

      <Input
        label="Repeat password"
        name="repeatPassword"
        type="password"
        value={newPassword}
        iconUrl={passwordIcon}
        onChange={(e) => setNewPassword(e.target.value)}
        customStyles={signUpInputStyles}
        error={errors.newPassword}
      />

      {errors.submitError && <span className={styles.errorMessage}>{errors.submitError}</span>}

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}
