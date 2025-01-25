const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const animals = [
    // Wild Animals - Mammals
    { category: "Mammals", name: "🐇 Rabbit", location: "Fields and Forests", resources: "2 Meat, 2 Fur" },
    { category: "Mammals", name: "🐗 Boar", location: "Forests and Wooded Areas", resources: "25 Meat, 5 Leather" },
    { category: "Mammals", name: "🦌 Deer", location: "Forests", resources: "12 Meat, 5 Leather" },
    { category: "Mammals", name: "🦌 Stag", location: "Forests", resources: "15 Meat, 6 Leather" },
    { category: "Mammals", name: "🦊 Fox", location: "Forests and Fields", resources: "6 Meat, 2 Fur" },
    { category: "Mammals", name: "🐺 Wolf", location: "Mountains and Forests", resources: "10 Meat, 4 Fur" },
    { category: "Mammals", name: "🐂 Bison", location: "Prairies", resources: "80 Meat, 30 Leather" },
    { category: "Mammals", name: "🐻 Bear", location: "Mountains and Caves", resources: "80 Meat, 30 Fur" },
    { category: "Mammals", name: "🐆 Lynx", location: "Cold Forests", resources: "8 Meat, 2 Fur" },
    { category: "Mammals", name: "🦌 Moose (Male)", location: "Cold Forests", resources: "40 Meat, 20 Leather" },
    { category: "Mammals", name: "🦌 Moose (Female)", location: "Cold Forests", resources: "30 Meat, 15 Leather" },
    { category: "Mammals", name: "🦡 Badger", location: "Forests and Fields", resources: "3 Meat, 3 Fur" },

    // Wild Animals - Birds
    { category: "Birds", name: "🪶 Crow", location: "Fields", resources: "2 Meat, 8 Feathers" },
    { category: "Birds", name: "🦆 Duck", location: "Lakes and Wetlands", resources: "4 Meat, 10 Feathers" },
    { category: "Birds", name: "🦅 Falcon", location: "Mountains", resources: "5 Meat, 20 Feathers" },
    { category: "Birds", name: "🕊️ Pigeon", location: "Villages and Fields", resources: "2 Meat, 10 Feathers" },
    { category: "Birds", name: "🦅 White-tailed Eagle", location: "Mountains", resources: "6 Meat, 30 Feathers" },

    // Fish
    { category: "Fish", name: "🐟 Roach", location: "Rivers and Lakes", resources: "1 Fish" },
    { category: "Fish", name: "🐠 Perch", location: "Rivers and Lakes", resources: "4 Fish" },
    { category: "Fish", name: "🐡 Pike", location: "Rivers and Lakes", resources: "7 Fish" },

    // Farm Animals
    { category: "Farm", name: "🐔 Chicken", location: "Purchased in Borowo and Rolnica", resources: "Eggs, Feathers" },
    { category: "Farm", name: "🐖 Pig", location: "Purchased in Rolnica", resources: "Manure" },
    { category: "Farm", name: "🦄 Donkey", location: "Purchased in Tutki", resources: "Transport" },
    { category: "Farm", name: "🦢 Goose", location: "Purchased in Gostovia", resources: "Eggs, Feathers" },
    { category: "Farm", name: "🐑 Sheep", location: "Purchased in Baranica", resources: "Wool" },
    { category: "Farm", name: "🐐 Goat", location: "Purchased in Denica", resources: "Milk" },
    { category: "Farm", name: "🐄 Cow", location: "Purchased in Gostovia", resources: "Milk" },
    { category: "Farm", name: "🐎 Horse", location: "Purchased in Hornica", resources: "Transport" },
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("animals")
        .setDescription("Displays information about the animals available in the game.")
        .addStringOption(option =>
            option
                .setName("category")
                .setDescription("Choose an animal category.")
                .setRequired(true)
                .addChoices(
                    { name: "Mammals", value: "Mammals" },
                    { name: "Birds", value: "Birds" },
                    { name: "Fish", value: "Fish" },
                    { name: "Farm", value: "Farm" }
                )
        ),
    async execute(interaction) {
        const selectedCategory = interaction.options.getString("category");

        // Filter animals by the selected category
        const filteredAnimals = animals.filter(animal => animal.category === selectedCategory);

        // Create embed to display animals in the category
        const embed = new EmbedBuilder()
            .setTitle(`📋 Animals - ${selectedCategory}`)
            .setColor(0x57f287);

        filteredAnimals.forEach(animal => {
            embed.addFields({
                name: animal.name,
                value: `🗺️ **Location:** ${animal.location}\n📦 **Resources:** ${animal.resources}`,
                inline: false,
            });
        });

        // Respond to the user with the embed
        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
