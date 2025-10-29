import gameImages from "@/constants/gameImages";

export const getImageSrc = (imageUrl: string): string => {
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  return gameImages[imageUrl] || imageUrl;
};

export default getImageSrc;
