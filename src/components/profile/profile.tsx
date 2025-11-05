import { useState } from "react";
import useAuth from "@/customHooks/useAuth";
import useProfileForm from "@/customHooks/useProfileForm";
import useProfileValidation from "@/customHooks/useProfileValidation";
import backgroundImage from "@/assets/images/background.jpg";
import ProfileForm from "./profileForm";
import ProfilePicture from "./profilePicture";
import Modal from "../modal/modal";
import ChangePassword from "../auth/changePassword";
import * as styles from "./profile.m.scss";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { username, profileDescription, profilePicture, setUsername, setProfileDescription, setProfilePicture, saveProfile } =
    useProfileForm(user);
  const { errors, validateInputs } = useProfileValidation();
  const [changePassword, setChangePassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs(username, profileDescription)) {
      return;
    }

    const response = await saveProfile(user);

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
