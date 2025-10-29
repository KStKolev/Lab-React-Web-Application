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
        customStyles={{
          wrapper: { display: "flex", flexDirection: "column", gap: "1em" },
          label: { fontSize: "1.5rem", color: "rgb(216, 216, 216)" },
          inputField: {
            fontSize: "1rem",
            width: "100%",
            color: "rgb(216, 216, 216)",
            border: "2px solid rgb(216, 216, 216)",
            backgroundColor: "rgba(0, 0, 0, 0.301)",
            padding: "1em 2.5em 1em 1.3em",
          },
          icon: {
            position: "absolute",
            top: "50%",
            right: "5%",
            height: "20px",
            width: "20px",
            transform: "translateY(-50%)",
          },
        }}
        onChange={(e) => props.setUsername(e.target.value)}
      />

      <Textarea
        label="Profile Description"
        name="profileDescription"
        value={props.profileDescription}
        error={props.errors.profileDescription}
        customStyles={{
          wrapper: { display: "flex", flexDirection: "column", gap: "1em" },
          label: { fontSize: "1.5rem", color: "rgb(216, 216, 216)" },
          textarea: {
            fontSize: "1rem",
            width: "100%",
            minHeight: "200px",
            maxHeight: "600px",
            color: "rgb(216, 216, 216)",
            border: "2px solid rgb(216, 216, 216)",
            backgroundColor: "rgba(0, 0, 0, 0.301)",
            padding: "1em 2.5em 1em 1.3em",
          },
        }}
        onChange={(e) => props.setProfileDescription(e.target.value)}
      />
    </form>
  );
}
