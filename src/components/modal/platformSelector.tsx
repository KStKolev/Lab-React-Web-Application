import { PlatformType, platformOptions } from "@/constants/platforms";
import FormGroup from "@/elements/formGroup";
import * as styles from "./platformSelector.m.scss";

interface PlatformSelectorProps {
  selectedPlatforms?: PlatformType[];
  onPlatformChange: (platform: PlatformType) => void;
  error?: string;
}

const formatPlatformLabel = (p: PlatformType): string => {
  switch (p) {
    case "PS":
      return "PlayStation 5";
    case "Xbox":
      return "XBox One";
    default:
      return p;
  }
};

export default function PlatformSelector({ selectedPlatforms, onPlatformChange, error }: PlatformSelectorProps) {
  return (
    <FormGroup>
      <div className={styles.platformCheckboxes}>
        <span className={styles.sectionTitle}>Platform</span>

        {platformOptions.map((platform) => (
          <label htmlFor={`platform-${platform}`} key={platform} className={styles.checkboxLabel}>
            {formatPlatformLabel(platform)}

            <input
              type="checkbox"
              name={`platform-${platform}`}
              checked={selectedPlatforms?.includes(platform) || false}
              onChange={() => onPlatformChange(platform)}
              className={styles.checkbox}
            />
          </label>
        ))}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </FormGroup>
  );
}
