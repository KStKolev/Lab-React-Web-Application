import { useState } from "react";
import { isStrongPassword } from "@/utils/validationUtils";

interface SignInErrors {
  username?: string;
  password?: string;
  submitError?: string;
}

interface SignUpErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  submitError?: string;
}

interface ChangePasswordErrors {
  oldPassword?: string;
  newPassword?: string;
  submitError?: string;
}

export function useSignInValidation() {
  const [errors, setErrors] = useState<SignInErrors>({});

  const validateInputs = (username: string, password: string): boolean => {
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

  return { errors, validateInputs, setErrors };
}

export function useSignUpValidation() {
  const [errors, setErrors] = useState<SignUpErrors>({});

  const validateInputs = (username: string, password: string, confirmPassword: string): boolean => {
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

  return { errors, validateInputs, setErrors };
}

export function useChangePasswordValidation() {
  const [errors, setErrors] = useState<ChangePasswordErrors>({});

  const validateInputs = (oldPassword: string, newPassword: string, currentUserPassword: string): boolean => {
    const newErrors: ChangePasswordErrors = {};

    if (!oldPassword) {
      newErrors.oldPassword = "Old password is required";
    } else if (currentUserPassword !== oldPassword) {
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

  return { errors, validateInputs, setErrors };
}
