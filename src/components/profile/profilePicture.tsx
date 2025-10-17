import defaultProfilePicture from "../../assets/images/noPhoto.jpg";
import * as profileImageStyles from "./profilePicture.m.scss";
import * as profileStyles from "./profile.m.scss";

interface ProfilePictureProps {
  profilePicture: string;
  onChange: (newPicture: string) => void;
}

export default function ProfilePicture(props: ProfilePictureProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    props.onChange(imageUrl);
  };

  return (
    <div className={profileImageStyles.profileImageContainer}>
      <img src={props.profilePicture || defaultProfilePicture} className={profileImageStyles.profileImage} alt="Profile" />
      <button
        type="button"
        className={profileStyles.profileButton}
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
