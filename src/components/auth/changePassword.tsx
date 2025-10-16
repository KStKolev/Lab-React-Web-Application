import { useState } from "react";
import { isStrongPassword } from "../../validation";
import InputText from "../../elements/inputText";
import useAuth from "../customHooks/useAuth";
import apiEndPoints from "../../api.endpoints";
import passwordIcon from "../../assets/images/icons/padlock.svg";
import * as styles from "./auth.m.scss";

interface ChangePasswordErrors {
  oldPassword?: string;
  newPassword?: string;
  submitError?: string;
}

interface ChangePasswordProps {
  onChangePasswordSuccess: () => void;
}

export default function ChangePassword(props: ChangePasswordProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState<ChangePasswordErrors>({});
  const { user, updateUser } = useAuth();

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setErrors({});
  };

  const validateInputs = () => {
    const newErrors: ChangePasswordErrors = {};

    if (!oldPassword) {
      newErrors.oldPassword = "Old password is required";
    } else if (user?.password !== oldPassword) {
      newErrors.oldPassword = "Old password is incorrect";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (!isStrongPassword(newPassword)) {
      newErrors.newPassword = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
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
      <div>
        <InputText
          label="Old Password"
          name="oldPassword"
          type="password"
          value={oldPassword}
          iconUrl={passwordIcon}
          onChange={(e) => setOldPassword(e.target.value)}
          error={errors.oldPassword}
        />
      </div>
      <div>
        <InputText
          label="New Password"
          name="newPassword"
          type="password"
          value={newPassword}
          iconUrl={passwordIcon}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.newPassword}
        />
      </div>
      {errors.submitError && <span className={styles.errorMessage}>{errors.submitError}</span>}
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}
