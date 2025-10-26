/* This is file contains api-mock-response to help you develop UI without real API side */

import webpackMockServer from "webpack-mock-server";
import apiEndpoints from "./api.endpoints";

const mockData = {
  id: 1,
  firstName: "Will",
  lastName: "Smith",
  email: "willsmith321@gmail.com",
};

const parseAgeRating = (ageString: string): number => {
  return parseInt(ageString.replace("+", ""), 10);
};

const gamesMockData = [
  {
    id: 1,
    title: "Overwatch",
    genre: "Shooter",
    productAddDate: "2025-08-01",
    price: 23.99,
    rating: 3.6,
    description:
      "Overwatch is a colorful team-based shooter game starring a diverse cast of powerful heroes. Travel the world, build a team, and contest objectives in exhilarating 6v6 combat.",
    age: "12+",
    platforms: ["PC"],
    imageUrl: "overwatch.jpg",
  },
  {
    id: 2,
    title: "Minecraft",
    genre: "Arcade",
    productAddDate: "2025-09-01",
    price: 25.99,
    rating: 4.5,
    description:
      "Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds. The games two main modes are Survival and Creative. In Survival, players must find their own building supplies and food. They also interact with blocklike mobs or moving creatures.",
    age: "3+",
    platforms: ["PC", "PS", "Xbox"],
    imageUrl: "minecraft.jpg",
  },
  {
    id: 3,
    title: "Terraria",
    genre: "Survive",
    productAddDate: "2025-10-01",
    price: 4.99,
    rating: 5,
    description:
      "Terraria is a 2D sandbox game with gameplay that revolves around exploration, building, crafting, combat, survival, and mining, playable in both single-player and multiplayer modes. The game has a 2D sprite tile-based graphical style reminiscent of classic 16-bit sprites found on the Super NES.",
    age: "6+",
    platforms: ["PC", "PS", "Xbox"],
    imageUrl: "terraria.jpg",
  },
  {
    id: 4,
    title: "Battlefield 1",
    genre: "Survive",
    productAddDate: "2025-07-01",
    price: 23.99,
    rating: 4,
    description:
      "Battlefield 1 is a first-person shooter video game developed by Digital Illusions CE (DICE) and published by Electronic Arts. It is the eleventh installment in the Battlefield series and was released in 2005 for Microsoft Windows.",
    age: "18+",
    platforms: ["PC"],
    imageUrl: "battlefield1.jpg",
  },
  {
    id: 5,
    title: "Counter Strike: Global Offensive",
    genre: "Shooter",
    productAddDate: "2025-06-01",
    price: 10,
    rating: 2,
    description:
      "Counter-Strike: Global Offensive (CS:GO) is a multiplayer first-person shooter developed by Hidden Path Entertainment and Valve Corporation. It is the fourth game in the Counter-Strike series and was released in 2012 for Windows, macOS, Xbox 360, and PlayStation 3.",
    age: "12+",
    platforms: ["PC"],
    imageUrl: "cs.jpg",
  },
  {
    id: 6,
    title: "Genshin Impact",
    genre: "Arcade",
    productAddDate: "2025-05-01",
    price: 14.99,
    rating: 4.3,
    description:
      "Genshin Impact is an action role-playing game developed and published by miHoYo. It was released in September 2020 for Microsoft Windows, PlayStation 4, Nintendo Switch, iOS, and Android.",
    age: "6+",
    platforms: ["PC", "PS", "Xbox"],
    imageUrl: "genshinimpact.jpg",
  },
  {
    id: 7,
    title: "Grand Theft Auto V",
    genre: "Survive",
    productAddDate: "2025-04-01",
    price: 32.99,
    rating: 4.7,
    description:
      "Grand Theft Auto V is an action-adventure game developed by Rockstar North and published by Rockstar Games. It was released in September 2013 for PlayStation 3 and Xbox 360, and later for Microsoft Windows.",
    age: "18+",
    platforms: ["PC", "PS", "Xbox"],
    imageUrl: "gta.jpg",
  },
  {
    id: 8,
    title: "Sims 4",
    genre: "Arcade",
    productAddDate: "2025-03-01",
    price: 14.99,
    rating: 4.3,
    description:
      "Sims 4 is a life simulation video game developed by Maxis and published by Electronic Arts. It is the fourth major title in the Sims series and was released in September 2014 for Microsoft Windows.",
    age: "3+",
    platforms: ["PC", "PS", "Xbox"],
    imageUrl: "sims4.jpg",
  },
];

const productNames = [
  "Overwatch",
  "Minecraft",
  "Terraria",
  "Battlefield 1",
  "Counter Strike: Global Offensive",
  "Genshin Impact",
  "Grand Theft Auto V",
  "Sims 4",
];

const mockUsers = [
  { username: "test", password: "123456", profileDescription: "just a user", profilePicture: "" },
  { username: "user", password: "green", profileDescription: "just another user", profilePicture: "" },
];

export default webpackMockServer.add((app) => {
  app.get(apiEndpoints.testMock, (_req, res) => res.json(mockData));

  app.get(apiEndpoints.topProducts, (_req, res) => {
    const sortedGames = [...gamesMockData].sort((a, b) => new Date(b.productAddDate).getTime() - new Date(a.productAddDate).getTime());
    res.json(sortedGames.slice(0, 3));
  });

  app.get(`${apiEndpoints.searchProducts}/:text`, (req, res) => {
    const query = req.params.text?.toString().toLowerCase() || "";
    const results = productNames.filter((name) => name.toLowerCase().includes(query));
    res.json(results);
  });

  app.post(apiEndpoints.signIn, (_req, res) => {
    const { username, password } = _req.body;

    const userExists = mockUsers.find((u) => u.username === username && u.password === password);

    if (!userExists) {
      return res.status(401).json({ code: 401, error: "Invalid username or password" });
    }

    const loggedInUser = {
      username: userExists.username,
      profileDescription: userExists.profileDescription,
      profilePicture: userExists.profilePicture,
      password: userExists.password,
    };

    return res.status(200).json({ code: 200, user: loggedInUser });
  });

  app.put(apiEndpoints.signUp, (_req, res) => {
    const { username, password } = _req.body;

    const userExists = mockUsers.some((user) => user.username === username);

    if (userExists) {
      return res.status(400).json({ code: 400, error: "Username already exists" });
    }

    const newUser = { username, password, profileDescription: "", profilePicture: "" };

    mockUsers.push(newUser);

    return res.status(201).json({ code: 201, user: newUser });
  });

  app.get(`${apiEndpoints.getProfile}/:username`, (req, res) => {
    const username = req.params.username.toString();
    const existingUser = mockUsers.find((u) => u.username === username);

    if (!existingUser) {
      return res.status(400).json({ code: 400, error: "User not found" });
    }

    return res.status(200).json({ code: 200, user: existingUser });
  });

  app.post(apiEndpoints.saveProfile, (_req, res) => {
    const { user, username, profileDescription, profilePicture } = _req.body;

    const existingUser = mockUsers.find((u) => u.username === user.username);

    if (!existingUser) {
      return res.status(400).json({ code: 400, error: "User not found" });
    }

    existingUser.username = username;
    existingUser.profileDescription = profileDescription;

    if (profilePicture && profilePicture.startsWith("blob:")) {
      existingUser.profilePicture = profilePicture;
    }

    return res.status(200).json({ code: 200, updatedUser: existingUser });
  });

  app.post(apiEndpoints.changePassword, (_req, res) => {
    const { user, oldPassword, newPassword } = _req.body;

    const existingUser = mockUsers.find((u) => u.username === user.username);

    if (!existingUser) {
      return res.status(400).json({ code: 400, error: "User not found" });
    }

    if (existingUser.password !== oldPassword) {
      return res.status(400).json({ code: 400, error: "Old password is incorrect" });
    }

    existingUser.password = newPassword;

    return res.status(200).json({ code: 200, updatedUser: existingUser });
  });

  app.get(`${apiEndpoints.getProducts}/:category`, (req, res) => {
    const { category } = req.params;
    const { sortType, sortDir, genre, age } = req.query;
    let results = [...gamesMockData].filter((g) => g.platforms.map((p) => p.toLowerCase()).includes(category.toLowerCase()));

    if (genre && genre !== "all genres") {
      results = results.filter((g) => g.genre.toLowerCase() === genre);
    }

    if (age && age !== "all ages") {
      const selectedAgeValue = parseAgeRating(age as string);
      results = results.filter((g) => parseAgeRating(g.age) <= selectedAgeValue);
    }

    const searchName = req.query.searchName as string;
    if (searchName.trim() !== "") {
      results = results.filter((g) => g.title.toLowerCase().includes(searchName.toLowerCase()));
    }

    if (sortType === "price" || sortType === "rating") {
      const direction = sortDir === "descending" ? -1 : 1;
      results.sort((a, b) => (a[sortType] - b[sortType]) * direction);
    }

    res.json(results);
  });
});
