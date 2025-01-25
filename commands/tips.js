const { SlashCommandBuilder } = require("discord.js");

const tips = [
    "🏡 **Build houses close to water sources** to make resource collection easier and keep your villagers efficient.",
    "🌳 **Set up villages near forests** to ensure an abundant supply of wood and easy access to essential resources.",
    "🍂 **Stock up on food** to survive the winter without relying solely on hunting or gathering.",
    "🌱 **Plant at the start of spring** to harvest before winter and secure your food supply.",
    "🔨 **Invest in high-quality tools** to increase workers' productivity and save time.",
    "🧑‍🌾 **Recruit workers with specific skills** to improve efficiency in tasks like farming, hunting, and carpentry.",
    "📦 **Build warehouses to store more resources** and avoid losing items due to limited capacity.",
    "🏘️ **Avoid building too close to other villages** to allow room for future expansion of your settlement.",
    "🎯 **Use hunting as an initial source of food and pelts**, which are essential for survival and trade.",
    "🌻 **Plan your crops according to the seasons**. Some seeds grow only during specific times of the year.",
    "🏠 **Upgrade your villagers' houses** to increase their happiness and productivity.",
    "🔥 **Install fireplaces in houses** to keep your villagers warm during the winter.",
    "🚜 **Gradually expand your farmlands** to avoid overworking your villagers.",
    "🍅 **Rotate crops** to maintain soil fertility and prevent pests.",
    "🐗 **Avoid direct confrontations with boars** unless you have good weapons.",
    "🐺 **Be cautious when exploring forests at night**, as wolves become more aggressive.",
    "🎯 **Use bows and arrows to hunt large animals** like deer and boars.",
    "🔪 **Collect pelts from hunted animals** to craft clothing and sell them in the market.",
    "🔄 **Manage your stockpiles regularly** to avoid waste and shortages of essential items.",
    "📊 **Buy seeds and rare materials in neighboring villages** to expand your production.",
    "💬 **Build good relationships with villagers** to make recruitment easier.",
    "🏃 **Invest in stamina skills** to save energy while exploring.",
    "🌙 **Avoid traveling long distances at night**, as visibility and safety are reduced.",
    "📦 **Transport heavy loads with carts** to save time and energy.",
    "📖 **Read tutorials at the beginning of the game to understand the core mechanics.**",
    "⛺ **Always carry a portable camp to rest in remote areas.**",
    "🏹 **Set traps to catch small animals like rabbits.**",
    "⚒️ **Prioritize essential buildings** like houses and warehouses before investing in decorations.",
    "📦 **Build warehouses close to production centers** to save time.",
    "🛒 **Explore different markets to find the best prices.**",
    "💡 **Assign tasks based on workers' skills.**",
    "⚖️ **Balance resource production and consumption** to avoid shortages.",
    "🌦️ **Pay attention to the seasons** to plant and harvest at the right time.",
    "🐗 **Use traps to avoid direct confrontations with wild animals.**",
    "🎁 **Give simple gifts to improve relationships with NPCs.**",
    "🚧 **Unlock buildings gradually** and don't rush to expand too quickly.",
    "🎯 **Use hunting as an initial source of food and pelts**, essential for survival and trade.",
    "🔨 **Repair damaged buildings regularly** to avoid losses.",
    "📜 **Research skills that increase resource production efficiency.**",
    "💰 **Sell high-value products** like clothing and quality tools to earn more profit.",
    "🌾 **Assign workers to tend crops automatically**, allowing you to focus on other tasks.",
    "🚪 **Close barn and house doors at night** to protect your resources from potential intruders.",
    "🛠️ **Build crafting workshops** to make valuable tools and items for trade.",
    "🌳 **Plant trees near your village** to ensure sustainable wood supplies in the long term.",
    "💼 **Manage taxes wisely**, saving money to pay in spring.",
    "🌟 **Complete villagers' side quests** to earn reputation and useful rewards.",
    "📜 **Use the map to mark important locations** like water sources, mines, and hunting areas.",
    "🐐 **Invest in goats to produce milk**, a valuable resource for recipes and sales.",
    "🐓 **Build chicken coops for a steady source of eggs and feathers.**",
    "🔧 **Repair your tools before they break completely** to avoid downtime.",
    "⏳ **Prioritize seasonal tasks** like harvesting and planting at the start of each season.",
    "👶 **Invest in relationships and build a family** to ensure heirs who will continue your village.",
    "🌠 **Decorate your village with torches and banners** to boost villagers' morale.",
    "💎 **Search for rare items in hidden chests while exploring the map.**",
    "🪓 **Trade broken tools with villagers to save money.**",
    "🚜 **Use fertilizers to increase food production on farmlands.**",
    "🎯 **Practice archery regularly** to improve your accuracy and efficiency in hunting.",
    "🍖 **Dry meat on racks to preserve it during the winter.**",
    "🏹 **High-quality bows make it easier to hunt larger prey.**",
    "🏡 **Keep villagers happy by providing good food and comfortable housing.**",
    "🛏️ **Rest in comfortable beds to recover energy quickly.**",
    "⛏️ **Explore deep caves to find iron, essential for advanced tools.**",
    "📜 **Unlock passive skills to increase your efficiency in various areas.**",
    "🦌 **Use stealth to approach deer without scaring them off.**",
    "💰 **Craft baskets and pots to sell in nearby markets.**",
    "🎁 **Giving gifts to villagers improves relationships and can secure discounts.**",
    "🌾 **Use a scythe to harvest wheat and oats faster.**",
    "🍗 **Cook meals over campfires to increase the nutritional value of food.**",
    "🔨 **Build a stable to house horses and increase your travel speed.**",
    "🏴 **Claim fertile lands** to expand your farmlands.",
    "🌌 **Travel during the day to avoid encounters with dangerous animals at night.**",
    "⚔️ **Always have a backup weapon** in case yours breaks during a confrontation.",
    "🐑 **Raise sheep to produce wool and craft warm clothing for winter.**",
    "📦 **Avoid hoarding too many useless items; prioritize essential resources.**",
    "🚰 **Carry a bucket of water during long journeys.**",
    "🐟 **Fish regularly to ensure a supply of fresh food.**",
    "🌱 **Use manure collected from animals to fertilize your crops.**",
    "🚪 **Lock warehouses to prevent unauthorized villagers from accessing valuable resources.**",
    "🌦️ **Plan wood collection on dry days to avoid losses from rain.**",
    "📜 **Read the description of each resource to learn unexpected uses.**",
    "🏞️ **Build villages on flat terrain to make expansion easier.**",
    "🏹 **Hunt rabbits and foxes with simple traps early in the game.**",
    "🐷 **Invest in pigs to produce manure for fertilization.**",
    "🛒 **Buy rare seeds during annual village fairs.**",
    "🌋 **Avoid dangerous areas until you have adequate equipment.**",
    "🎯 **Practice your aim on targets to prepare for larger hunts.**",
    "🔒 **Unlock advanced carpentry skills** to build better houses.",
    "🍎 **Collect wild fruits in summer to ensure a good source of vitamins.**",
    "🔨 **Upgrade your workers' tools to increase their efficiency.**",
];

let lastTip = null; // Variable to store the last tip sent

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tips")
        .setDescription("Get a random tip about Medieval Dynasty!"),
    async execute(interaction) {
        let newTip;

        // Ensures the new tip is different from the last one
        do {
            newTip = tips[Math.floor(Math.random() * tips.length)];
        } while (newTip === lastTip && tips.length > 1);

        lastTip = newTip; // Updates the last tip sent

        await interaction.reply({
            content: `🔹 **Random Tip:**\n${newTip}`,
            ephemeral: true, // Sets the message to ephemeral
        });
    },
};
