import { useState, useEffect } from "react";
import apiEndpoints from "@/api.endpoints";
import ProfileForm from "./profileForm";
import ProfilePicture from "./profilePicture";
import Modal from "../modal/modal";
import ChangePassword from "../auth/changePassword";
import backgroundImage from "../../assets/images/background.jpg";
import useAuth from "../customHooks/useAuth";
import * as styles from "./profile.m.scss";

interface ProfileErrors {
  username?: string;
  profileDescription?: string;
}

export default function Profile() {
  const [username, setUsername] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const { user, updateUser } = useAuth();

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

  const validateInputs = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const response = await fetch(apiEndpoints.saveProfile, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        username,
        profileDescription,
        profilePicture,
      }),
    }).then((res) => res.json());

    if (response.code === 200) {
      updateUser(response.updatedUser);
    }
  };

  return (
    <main className={styles.profileMain} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <section className={styles.profileSection}>
        <h1 className={styles.profileTitle}>{user?.username} profile page</h1>
        <hr />
        <div className={styles.profileContent}>
          <ProfilePicture profilePicture={profilePicture} onChange={setProfilePicture} />

          <ProfileForm
            username={username}
            profileDescription={profileDescription}
            errors={errors}
            setUsername={setUsername}
            setProfileDescription={setProfileDescription}
          />

          <div className={styles.profileButtons}>
            <button type="button" className={styles.profileButton} onClick={handleSubmit}>
              Save profile
            </button>
            <button type="button" className={styles.profileButton} onClick={() => setChangePassword(!changePassword)}>
              Change password
            </button>
          </div>
        </div>
      </section>

      {changePassword && (
        <Modal
          modalTitle="Change Password"
          onClose={() => setChangePassword(false)}
          customStyles={{
            overlay: {
              backgroundColor: "rgb(76, 76, 76)",
            },
            wrapper: { width: "50%" },
            title: { fontSize: "1.8rem" },
          }}
        >
          <ChangePassword onChangePasswordSuccess={() => setChangePassword(false)} />
        </Modal>
      )}
    </main>
  );
}
