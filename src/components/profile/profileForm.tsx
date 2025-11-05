import { profileInputStyles, profileTextareaStyles } from "@/constants/profileFormStyles";
import Input from "@/elements/input";
import Textarea from "@/elements/textarea";
import signInIcon from "@/assets/images/icons/signInInput.svg";
import * as styles from "./profileForm.m.scss";

interface ProfileFormProps {
  username: string;
  profileDescription: string;
  errors: {
    username?: string;
    profileDescription?: string;
  };
  setUsername: (username: string) => void;
  setProfileDescription: (description: string) => void;
}

export default function ProfileForm(props: ProfileFormProps) {
  return (
    <form className={styles.profileForm}>
      <Input
        label="Username"
        name="username"
        type="text"
        value={props.username}
        error={props.errors.username}
        iconUrl={signInIcon}
        customStyles={profileInputStyles}
        onChange={(e) => props.setUsername(e.target.value)}
      />

      <Textarea
        label="Profile Description"
        name="profileDescription"
        value={props.profileDescription}
        error={props.errors.profileDescription}
        customStyles={profileTextareaStyles}
        onChange={(e) => props.setProfileDescription(e.target.value)}
      />
    </form>
  );
}
