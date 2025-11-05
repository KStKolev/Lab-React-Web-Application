import { useState, useEffect } from "react";
import apiEndpoints from "@/api.endpoints";

interface User {
  username?: string;
  profileDescription?: string;
  profilePicture?: string;
}

export default function useProfileForm(user?: User | null) {
  const [username, setUsername] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const getProfile = async (name: string) => {
    const res = await fetch(`${apiEndpoints.getProfile}/${encodeURIComponent(name)}`);
    const response = await res.json();

    if (response.code === 200) {
      setUsername(response.user.username);
      setProfileDescription(response.user.profileDescription);
      setProfilePicture(response.user.profilePicture);
    }
  };

  useEffect(() => {
    if (user?.username) {
      getProfile(user.username);
    }
  }, [user]);

  const saveProfile = async (currentUser?: User | null) => {
    const response = await fetch(apiEndpoints.saveProfile, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: currentUser,
        username,
        profileDescription,
        profilePicture,
      }),
    }).then((res) => res.json());

    return response;
  };

  return {
    username,
    profileDescription,
    profilePicture,
    setUsername,
    setProfileDescription,
    setProfilePicture,
    saveProfile,
  };
}
