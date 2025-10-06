import { useEffect, useState } from "react";
import GameCard from "./gameCard";
import * as style from "./newGames.m.scss";
import { PlatformType } from "../../../platforms";
import apiEndpoints from "../../../api.endpoints";
import overwatchImage from "../../../assets/images/games/overwatch.jpg";
import minecraftImage from "../../../assets/images/games/minecraft.jpg";
import terrariaImage from "../../../assets/images/games/terraria.jpg";

interface IGame {
  id: number;
  title: string;
  productAddDate: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  age: string;
  platforms: PlatformType[];
}

const gameImages: Record<string, string> = {
  Overwatch: overwatchImage,
  Minecraft: minecraftImage,
  Terraria: terrariaImage,
};

export default function NewGames() {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    const fetchTopGames = async () => {
      const response = await fetch(apiEndpoints.topGames);
      const gamesData: IGame[] = await response.json();
      setGames(gamesData);
    };

    fetchTopGames();
  }, []);

  return (
    <section className={style.newGamesSection}>
      <h2 className={style.newGamesTitle}>New games</h2>
      <hr />
      <div className={style.newGamesContainer}>
        {games.map((game) => {
          const gameImage = gameImages[game.title] || "";
          return <GameCard game={{ ...game, image: gameImage }} key={game.id} />;
        })}
      </div>
    </section>
  );
}
