/* Details for each game in GAMES (index.html), by game id. Loaded before the
   main script, which merges them into GAMES.
     image        cover art, linked from the official store (Steam, Nintendo,
                  PlayStation, Epic, Xbox); the page shows initials if it fails
     description  a short summary, in our own words
     tags         store-style descriptive tags (also searchable)
     platforms    [platform, US list price, optional note]: the base edition's
                  regular price on that platform's official store, not sale
                  prices. "No longer sold" for platforms it once came out on.
   Prices checked October 16, 2026.                                            */
const PRICES_CHECKED = "October 2026";

const STEAM = id => `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${id}`;
const NINTENDO = path => `https://assets.nintendo.com/image/upload/c_fill,w_960/q_auto/f_auto/${path}`;
const PLAYSTATION = path => `https://image.api.playstation.com/vulcan/${path}?w=960&thumb=false`;

const DETAILS = {
  // Competitive Multiplayer
  "counter-strike-2": {
    image: STEAM("730/162664aa5da85f418105350c5d67ca565f6c3713/header.jpg?t=1791824795"),
    description: "Two teams of five take turns planting and defusing a bomb over short, tense rounds. Money earned each round buys weapons and gear, so aim, economy and teamwork all matter. It replaced Counter-Strike: Global Offensive in 2023 and is free to play.",
    tags: ["FPS", "Tactical", "Team-Based", "Esports", "Free to Play"],
    platforms: [["Windows", "Free"], ["Linux", "Free"]],
  },
  "team-fortress-2": {
    image: STEAM("440/header.jpg?t=1757348372"),
    description: "Nine cartoonish classes, from the Heavy to the Spy, fight over control points and push payload carts. Each class plays very differently, and the game's humor has kept it popular since 2007. It has been free to play since 2011.",
    tags: ["FPS", "Class-Based", "Team-Based", "Comedy", "Free to Play"],
    platforms: [["Windows", "Free"], ["Linux", "Free"], ["Mac", "No longer sold"],
      ["Xbox 360", "No longer sold", "The Orange Box"], ["PlayStation 3", "No longer sold", "The Orange Box"]],
  },
  "fortnite": {
    image: NINTENDO("store/software/switch/70010000010192/a527817db47c1aafb78e2cc4ad92e70c9efce0aef494230e950751498e8b3880"),
    description: "Drop onto an island with up to 100 players and be the last one standing, building walls and ramps to outplay opponents. Beyond Battle Royale, it has survival, racing and music modes and thousands of player-made islands.",
    tags: ["Battle Royale", "Third-Person Shooter", "Building", "Cross-Platform", "Free to Play"],
    platforms: [["Windows", "Free"], ["PlayStation 5", "Free"], ["PlayStation 4", "Free"], ["Xbox Series X|S", "Free"],
      ["Xbox One", "Free"], ["Nintendo Switch 2", "Free"], ["Nintendo Switch", "Free"], ["iOS", "Free"], ["Android", "Free"],
      ["Mac", "No longer sold"]],
  },
  "halo-infinite": {
    image: STEAM("1240440/2262ffb4f1659df1c1cbf2c70af40560b4fa12e4/header.jpg?t=1774464322"),
    description: "Master Chief returns in an open-world campaign on the ringworld Zeta Halo, alongside a free-to-play multiplayer arena shooter. Multiplayer is free; the campaign is sold separately.",
    tags: ["FPS", "Sci-Fi", "Arena Shooter", "Open World", "Free to Play"],
    platforms: [["Windows", "Free", "Campaign $59.99"], ["Xbox Series X|S", "Free", "Campaign $59.99"],
      ["Xbox One", "Free", "Campaign $59.99"]],
  },
  "league-of-legends": {
    image: "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-47eb328eac5ddd63ebd096ded7d0d5ab?resize=1&w=960&quality=medium",
    description: "Two teams of five champions battle across three lanes to destroy the enemy's Nexus. With more than 160 champions to choose from, no two matches play out the same, and it's one of the biggest esports in the world.",
    tags: ["MOBA", "Strategy", "Team-Based", "Esports", "Free to Play"],
    platforms: [["Windows", "Free"], ["Mac", "Free"]],
  },
  "marvel-rivals": {
    image: STEAM("2767030/c61f65c5968af5d85b0393005991ecee0184fcaf/header.jpg?t=1792140776"),
    description: "A 6v6 hero shooter with Marvel heroes and villains, from Spider-Man to Loki. Characters can combine abilities with teammates, and destructible maps keep every fight changing.",
    tags: ["Hero Shooter", "Third-Person Shooter", "Superhero", "Team-Based", "Free to Play"],
    platforms: [["Windows", "Free"], ["PlayStation 5", "Free"], ["Xbox Series X|S", "Free"]],
  },
  "super-smash-bros-ultimate": {
    image: NINTENDO("store/software/switch/70010000012332/ac4d1fc9824876ce756406f0525d50c57ded4b2a666f6dfe40a6ac5c3563fad9"),
    description: "Nintendo's crossover fighting game brings together every fighter in the series' history, from Mario and Link to Pikachu and Sonic. Knock opponents off the stage in fast, chaotic battles for up to eight players.",
    tags: ["Fighting", "Platform Fighter", "Party", "Local Multiplayer", "Crossover"],
    platforms: [["Nintendo Switch", "$59.99"]],
  },
  // Racing
  "forza-horizon-5": {
    image: STEAM("1551360/header.jpg?t=1788546569"),
    description: "Race across an open-world Mexico, from jungles and volcanoes to city streets, in hundreds of real cars. The seasons change the map every week, with events from street races to off-road stunts.",
    tags: ["Racing", "Open World", "Driving", "Cars", "Online Co-op"],
    platforms: [["Windows", "$59.99"], ["Xbox Series X|S", "$59.99"], ["Xbox One", "$59.99"], ["PlayStation 5", "$59.99"]],
  },
  "gran-turismo-7": {
    image: PLAYSTATION("ap/rnd/202109/1321/y7iyxoBE8VKotN89QCFhLgLM.png"),
    description: "A realistic driving simulator that celebrates car culture, with hundreds of carefully modeled cars and real-world tracks. Collect and tune cars through a café-themed campaign, or race others online.",
    tags: ["Racing", "Simulation", "Realistic", "Cars", "Driving"],
    platforms: [["PlayStation 5", "$69.99", "Includes the PS4 version"], ["PlayStation 4", "$59.99"]],
  },
  "mario-kart-8-deluxe": {
    image: NINTENDO("store/software/switch/70010000000153/de697f487a36d802dd9a5ff0341f717c8486221f2f1219b675af37aca63bc453"),
    description: "Race as Mario and friends on tracks that flip upside down, glide through the air and dive underwater, using items to knock rivals back. Up to four people can play on one screen.",
    tags: ["Kart Racing", "Party", "Local Multiplayer", "Family", "Arcade"],
    platforms: [["Nintendo Switch", "$59.99"]],
  },
  // Action & Adventure
  "final-fantasy-vii-rebirth": {
    image: STEAM("2909400/64a1006a85342c7d3e4b1e1b8e562fee2dc86578/header.jpg?t=1789446799"),
    description: "The second part of the Final Fantasy VII remake trilogy follows Cloud and his friends as they leave Midgar to chase Sephiroth across a vast open world. Battles mix real-time action with pausing to choose spells and abilities.",
    tags: ["RPG", "Action RPG", "Story Rich", "Open World", "Fantasy"],
    platforms: [["PlayStation 5", "$49.99"], ["Windows", "$49.99"], ["Xbox Series X|S", "$49.99"], ["Nintendo Switch 2", "$49.99"]],
  },
  "marvel-s-spider-man-2": {
    image: STEAM("2651280/header.jpg?t=1763569811"),
    description: "Play as both Peter Parker and Miles Morales as they swing across an expanded New York City and face Kraven the Hunter and the Venom symbiote. You can switch between the two Spider-Men as the story goes on.",
    tags: ["Action", "Open World", "Superhero", "Story Rich", "Singleplayer"],
    platforms: [["PlayStation 5", "$69.99"], ["Windows", "$59.99"]],
  },
  "the-legend-of-zelda-tears-of-the-kingdom": {
    image: NINTENDO("store/software/switch/70010000063714/fb30eab428df3fc993b41c76e20f72e4d76d49734d17d31996b5ab61c414b117"),
    description: "Link explores Hyrule's land, the islands in the sky and the depths below to stop an ancient evil. New powers let you fuse items into weapons and build vehicles out of whatever you find.",
    tags: ["Open World", "Adventure", "Exploration", "Puzzle", "Fantasy"],
    platforms: [["Nintendo Switch", "$69.99"], ["Nintendo Switch 2", "$79.99", "Nintendo Switch 2 Edition"]],
  },
  "ratchet-clank": {
    image: PLAYSTATION("img/rnd/202011/0204/g7QavKoff0uAngWn4Hiytel9.png"),
    description: "A 2016 reimagining of the 2002 original, released alongside the animated movie. Ratchet, a Lombax mechanic, and Clank, his robot friend, team up to save the galaxy with over-the-top gadgets and weapons.",
    tags: ["Platformer", "Third-Person Shooter", "Sci-Fi", "Family", "Singleplayer"],
    platforms: [["PlayStation 4", "$19.99", "Also plays on PS5"]],
  },
  "baldur-s-gate-3": {
    image: STEAM("1086940/48a2fcbda8565bb45025e98fd8ebde8a7203f6a0/header.jpg?t=1777363040"),
    description: "A party-based RPG built on Dungeons & Dragons rules, where almost every choice changes the story. Recruit companions, fight turn-based battles, and play alone or with up to three friends.",
    tags: ["RPG", "Turn-Based", "Fantasy", "Story Rich", "Co-op"],
    platforms: [["Windows", "$59.99"], ["Mac", "$59.99"], ["PlayStation 5", "$69.99"], ["Xbox Series X|S", "$69.99"]],
  },
  "hollow-knight-silksong": {
    image: STEAM("1030300/7983574d464e6559ac7e24275727f73a8bcca1f3/header.jpg?t=1776125736"),
    description: "Play as Hornet as she climbs through Pharloom, a haunted kingdom of silk and song. Fast, acrobatic combat and a huge interconnected map make this follow-up to Hollow Knight a demanding 2D adventure.",
    tags: ["Metroidvania", "2D Platformer", "Difficult", "Hand-Drawn", "Singleplayer"],
    platforms: [["Windows", "$19.99"], ["Mac", "$19.99"], ["Linux", "$19.99"], ["PlayStation 5", "$19.99"], ["PlayStation 4", "$19.99"],
      ["Xbox Series X|S", "$19.99"], ["Xbox One", "$19.99"], ["Nintendo Switch 2", "$19.99"], ["Nintendo Switch", "$19.99"]],
  },
  "elden-ring": {
    image: STEAM("1245620/header.jpg?t=1790290043"),
    description: "Explore the Lands Between, a vast dark-fantasy world created by FromSoftware with George R. R. Martin. Tough boss fights reward patience and practice, and you can summon other players for help.",
    tags: ["Souls-like", "Open World", "Dark Fantasy", "Difficult", "RPG"],
    platforms: [["Windows", "$59.99"], ["PlayStation 5", "$59.99"], ["PlayStation 4", "$59.99"], ["Xbox Series X|S", "$59.99"],
      ["Xbox One", "$59.99"], ["Nintendo Switch 2", "$79.99", "Tarnished Edition, includes Shadow of the Erdtree"]],
  },
  "monster-hunter-wilds": {
    image: STEAM("2246340/header.jpg?t=1787549555"),
    description: "Track and hunt huge monsters across changing landscapes, alone or with up to three other hunters. Craft new weapons and armor from what you hunt to take on tougher prey.",
    tags: ["Action", "Co-op", "Hunting", "Crafting", "Open World"],
    platforms: [["Windows", "$39.99"], ["PlayStation 5", "$39.99"], ["Xbox Series X|S", "$39.99"]],
  },
  "god-of-war": {
    image: STEAM("1593500/header.jpg?t=1763059412"),
    description: "Kratos, the former Greek god of war, now lives in the world of Norse myth with his young son Atreus. Their journey to scatter his wife's ashes becomes a story about fatherhood, told in what looks like one continuous shot.",
    tags: ["Action", "Mythology", "Story Rich", "Hack and Slash", "Singleplayer"],
    platforms: [["PlayStation 4", "$19.99", "Also plays on PS5"], ["Windows", "$49.99"]],
  },
  "grand-theft-auto-v": {
    image: STEAM("3240220/header.jpg?t=1781187782"),
    description: "Switch between three criminals as they pull off heists across Los Santos, a satire of Los Angeles. It includes GTA Online, a shared world that keeps getting new content.",
    tags: ["Open World", "Crime", "Third-Person Shooter", "Driving", "Heists"],
    platforms: [["Windows", "$29.99"], ["PlayStation 5", "$39.99"], ["Xbox Series X|S", "$39.99"],
      ["PlayStation 4", "$29.99", "Premium Edition"], ["Xbox One", "$29.99", "Premium Edition"],
      ["PlayStation 3", "No longer sold"], ["Xbox 360", "No longer sold"]],
  },
  "super-mario-odyssey": {
    image: NINTENDO("store/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5"),
    description: "Mario sails to kingdoms around the world aboard the Odyssey to rescue Princess Peach. His hat, Cappy, lets him take control of enemies and objects, and a second player can play as Cappy.",
    tags: ["3D Platformer", "Adventure", "Exploration", "Family", "Collectathon"],
    platforms: [["Nintendo Switch", "$59.99"]],
  },
  "cyberpunk-2077": {
    image: STEAM("1091500/e9047d8ec47ae3d94bb8b464fb0fc9e9972b4ac7/header.jpg?t=1784714077"),
    description: "As V, a mercenary in the neon megacity of Night City, you chase a one-of-a-kind implant that holds the key to immortality. Shape your character with cyberware and choose how each mission plays out.",
    tags: ["RPG", "Open World", "Sci-Fi", "Cyberpunk", "Story Rich"],
    platforms: [["Windows", "$59.99"], ["Mac", "$59.99"], ["PlayStation 5", "$59.99"], ["Xbox Series X|S", "$59.99"],
      ["Nintendo Switch 2", "$69.99", "Ultimate Edition"], ["PlayStation 4", "$59.99"], ["Xbox One", "$59.99"],
      ["Stadia", "No longer sold"]],
  },
  // Build & Strategize
  "minecraft": {
    image: "https://store-images.s-microsoft.com/image/apps.58378.13850085746326678.826cc014-d610-46af-bdb3-c5c96be4d22c.64287a91-c69e-4723-bb61-03fecd348c2a?q=90&w=960&h=540",
    description: "Build, mine and survive in an endless world made of blocks. Fight off monsters and hunger in Survival mode, or build anything you can imagine with unlimited blocks in Creative, alone or with friends.",
    tags: ["Sandbox", "Survival", "Building", "Crafting", "Open World"],
    platforms: [["Windows", "$29.99", "Java & Bedrock"], ["Mac", "$29.99", "Java Edition"], ["Linux", "$29.99", "Java Edition"],
      ["PlayStation 5", "$19.99"], ["PlayStation 4", "$19.99"], ["Xbox Series X|S", "$19.99"], ["Xbox One", "$19.99"],
      ["Nintendo Switch", "$29.99"], ["iOS", "$6.99"], ["Android", "$6.99"],
      ["Xbox 360", "No longer sold"], ["PlayStation 3", "No longer sold"], ["PlayStation Vita", "No longer sold"],
      ["Wii U", "No longer sold"], ["Nintendo 3DS", "No longer sold"]],
  },
  "civilization-vii": {
    image: STEAM("1295660/header.jpg?t=1789481137"),
    description: "Lead a civilization from antiquity to the modern age, founding cities, researching technology and dealing with rival leaders. New to the series, your civilization changes into a new one as each age begins.",
    tags: ["Turn-Based Strategy", "4X", "Historical", "Empire Building", "Singleplayer"],
    platforms: [["Windows", "$69.99"], ["Mac", "$69.99"], ["Linux", "$69.99"], ["PlayStation 5", "$69.99"], ["PlayStation 4", "$69.99"],
      ["Xbox Series X|S", "$69.99"], ["Xbox One", "$69.99"], ["Nintendo Switch 2", "$69.99"], ["Nintendo Switch", "$59.99"]],
  },
  "animal-crossing": {
    image: NINTENDO("store/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a"),
    description: "In Animal Crossing: New Horizons, you move to a deserted island and turn it into your own community. Gather resources, decorate your home and invite animal villagers to move in, all following the real-world calendar and seasons.",
    tags: ["Life Sim", "Cozy", "Relaxing", "Customization", "Family"],
    platforms: [["Nintendo Switch", "$59.99"], ["Nintendo Switch 2", "$64.99", "Nintendo Switch 2 Edition"]],
  },
};
