import PCIcon from "@/assets/images/platforms/pc.png";
import PlayStationIcon from "@/assets/images/platforms/ps.png";
import XboxIcon from "@/assets/images/platforms/xbox.png";

export const platformIcons: Record<PlatformType, string> = {
  PC: PCIcon,
  PS: PlayStationIcon,
  Xbox: XboxIcon,
};

export type PlatformType = "PC" | "PS" | "Xbox";

export const platformOptions: PlatformType[] = ["PC", "PS", "Xbox"];

export const allowedCategories: string[] = ["pc", "ps", "xbox"];
