import { useState, useEffect } from "react";
import apiEndpoints from "@/api.endpoints";
import InputText from "../../elements/inputText";
import Textarea from "../../elements/textarea";
import Modal from "../modal/modal";
import ChangePassword from "../auth/changePassword";
import backgroundImage from "../../assets/images/background.jpg";
import defaultProfilePicture from "../../assets/images/noPhoto.jpg";
import signInIcon from "../../assets/images/icons/signInInput.svg";
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setProfilePicture(imageUrl);
  };

  return (
    <main className={styles.profileMain} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <section className={styles.profileSection}>
        <h1 className={styles.profileTitle}>{user?.username} profile page</h1>
        <hr />
        <div className={styles.profileContent}>
          <div className={styles.profileImageContainer}>
            <img src={profilePicture || defaultProfilePicture} className={styles.profileImage} alt="Profile" />
            <button
              type="button"
              className={styles.profileButton}
              onClick={() => {
                document.getElementById("profileImageInput")?.click();
              }}
            >
              Change profile image
            </button>
            <input type="file" accept="image/*" id="profileImageInput" style={{ display: "none" }} onChange={handleImageChange} />
          </div>
          <div>
            <form className={styles.profileForm}>
              <InputText
                label="Username"
                name="username"
                type="text"
                value={username}
                error={errors.username}
                iconUrl={signInIcon}
                vertical
                onChange={(e) => setUsername(e.target.value)}
              />
              <Textarea
                label="Profile Description"
                name="profileDescription"
                value={profileDescription}
                error={errors.profileDescription}
                vertical
                onChange={(e) => setProfileDescription(e.target.value)}
              />
            </form>
          </div>
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
        <Modal modalTitle="Change Password" onClose={() => setChangePassword(false)}>
          <ChangePassword onChangePasswordSuccess={() => setChangePassword(false)} />
        </Modal>
      )}
    </main>
  );
}
