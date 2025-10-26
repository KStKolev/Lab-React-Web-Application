const platforms = {
  PC: "PC",
  PS: "PS",
  Xbox: "Xbox",
};

export type PlatformType = keyof typeof platforms;
export const allowedCategories = Object.keys(platforms).map((key) => key.toLowerCase());
export default platforms;
