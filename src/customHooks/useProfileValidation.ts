import { useState } from "react";

interface ProfileErrors {
  username?: string;
  profileDescription?: string;
}

export default function useProfileValidation() {
  const [errors, setErrors] = useState<ProfileErrors>({});

  const validateInputs = (username: string, profileDescription: string): boolean => {
    const newErrors: ProfileErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!profileDescription.trim()) {
      newErrors.profileDescription = "Profile description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateInputs, setErrors };
}
