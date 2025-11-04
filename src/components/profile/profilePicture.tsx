import { memo } from "react";
import defaultProfilePicture from "@/assets/images/noPhoto.jpg";
import * as styles from "./profilePicture.m.scss";

interface ProfilePictureProps {
  profilePicture: string;
  onChange: (newPicture: string) => void;
}

function ProfilePicture(props: ProfilePictureProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    props.onChange(imageUrl);
  };

  return (
    <div className={styles.profileImageContainer}>
      <img src={props.profilePicture || defaultProfilePicture} className={styles.profileImage} alt="Profile" />

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
  );
}

export default memo(ProfilePicture);
