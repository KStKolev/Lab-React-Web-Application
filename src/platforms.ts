export const PLATFORMS = {
  PC: "PC",
  PS: "PS",
  Xbox: "Xbox",
} as const;

export type PlatformType = keyof typeof PLATFORMS;
export default PLATFORMS;
