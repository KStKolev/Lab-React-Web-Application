/* This is file contains api-mock-response to help you develop UI without real API side */

import webpackMockServer from "webpack-mock-server";
import apiEndpoints from "./api.endpoints";

const mockData = {
  id: 1,
  firstName: "Will",
  lastName: "Smith",
  email: "willsmith321@gmail.com",
};

const topGamesMockData = [
  {
    id: 1,
    title: "Overwatch",
    productAddDate: "2025-10-01",
    price: 23.99,
    rating: 3.6,
    description:
      "Overwatch is a colorful team-based shooter game starring a diverse cast of powerful heroes. Travel the world, build a team, and contest objectives in exhilarating 6v6 combat.",
    age: "12+",
    platforms: ["PC"],
  },
  {
    id: 2,
    title: "Minecraft",
    productAddDate: "2025-09-18",
    price: 25.99,
    rating: 4.5,
    description:
      "Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds. The games two main modes are Survival and Creative. In Survival, players must find their own building supplies and food. They also interact with blocklike mobs or moving creatures.",
    age: "3+",
    platforms: ["PC", "PS", "Xbox"],
  },
  {
    id: 3,
    title: "Terraria",
    productAddDate: "2025-07-16",
    price: 4.99,
    rating: 5,
    description:
      "Terraria is a 2D sandbox game with gameplay that revolves around exploration, building, crafting, combat, survival, and mining, playable in both single-player and multiplayer modes. The game has a 2D sprite tile-based graphical style reminiscent of classic 16-bit sprites found on the Super NES.",
    age: "6+",
    platforms: ["PC", "PS", "Xbox"],
  },
];

const gameNames = [
  "Overwatch",
  "Minecraft",
  "Terraria",
  "The Witcher 3: Wild Hunt",
  "Cyberpunk 2077",
  "Stardew Valley",
  "Hades",
  "Celeste",
  "Hollow Knight",
  "Dark Souls III",
  "Red Dead Redemption 2",
  "God of War",
  "The Legend of Zelda: Breath of the Wild",
  "Super Mario Odyssey",
  "Animal Crossing: New Horizons",
  "Fortnite",
  "Apex Legends",
  "Call of Duty: Warzone",
  "League of Legends",
  "Dota 2",
];

export default webpackMockServer.add((app) => {
  app.get(apiEndpoints.testMock, (_req, res) => res.json(mockData));
  app.get(apiEndpoints.topGames, (_req, res) => {
    const sortedGames = [...topGamesMockData].sort((a, b) => new Date(b.productAddDate).getTime() - new Date(a.productAddDate).getTime());
    res.json(sortedGames);
  });
  app.get(`${apiEndpoints.searchGames}/:text`, (req, res) => {
    const query = req.params.text?.toString().toLowerCase() || "";
    const results = gameNames.filter((name) => name.toLowerCase().includes(query));
    res.json(results);
  });
});
