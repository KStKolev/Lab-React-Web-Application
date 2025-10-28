import { PlatformType } from "../../../utils/platforms";
import PCIcon from "../../../assets/images/platforms/pc.png";
import PlayStationIcon from "../../../assets/images/platforms/ps.png";
import XboxIcon from "../../../assets/images/platforms/xbox.png";
import * as style from "./platforms.m.scss";

interface PlatformsProps {
  platforms: PlatformType[];
}

const platformIcons: Record<PlatformType, string> = {
  PC: PCIcon,
  PS: PlayStationIcon,
  Xbox: XboxIcon,
};

export default function Platforms({ platforms }: PlatformsProps) {
  return (
    <ul className={style.platformsList}>
      {platforms.map((platform) => (
        <li key={`platform-${platform}`}>
          <img className={style.platformIcon} src={platformIcons[platform]} alt={platform} />
        </li>
      ))}
    </ul>
  );
}
