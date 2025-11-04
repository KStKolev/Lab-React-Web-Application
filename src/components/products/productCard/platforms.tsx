import { PlatformType, platformIcons } from "@/constants/platforms";
import * as style from "./platforms.m.scss";

interface PlatformsProps {
  platforms: PlatformType[];
}

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
