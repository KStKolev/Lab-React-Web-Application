import PCIcon from "@/assets/images/platforms/pc.png";
import PlayStationIcon from "@/assets/images/platforms/ps.png";
import XboxIcon from "@/assets/images/platforms/xbox.png";

const platforms = {
  PC: "PC",
  PS: "PS",
  Xbox: "Xbox",
};

export type PlatformType = keyof typeof platforms;
export const allowedCategories = Object.keys(platforms).map((key) => key.toLowerCase());

export const platformIcons: Record<PlatformType, string> = {
  PC: PCIcon,
  PS: PlayStationIcon,
  Xbox: XboxIcon,
};
