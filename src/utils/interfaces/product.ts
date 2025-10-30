import { PlatformType } from "../platforms";

export interface ProductProps {
  id: number;
  title: string;
  genre: string;
  productAddDate: string;
  price: number;
  rating: number;
  imageUrl: string;
  description: string;
  age: string;
  platforms: PlatformType[];
}
