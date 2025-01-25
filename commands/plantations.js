const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const plantations = [
    { name: "🌾 Wheat", plant: "Spring or Autumn", harvest: "Summer or Spring" },
    { name: "🍺 Barley", plant: "Spring", harvest: "Autumn" },
    { name: "🌾 Rye", plant: "Autumn", harvest: "Spring" },
    { name: "🌾 Oats", plant: "Spring", harvest: "Autumn" },
    { name: "🥕 Carrot", plant: "Spring or Autumn", harvest: "Autumn or Summer" },
    { name: "🍠 Beetroot", plant: "Spring", harvest: "Autumn" },
    { name: "🌿 Flax", plant: "Spring", harvest: "Summer" },
    { name: "🌺 Poppy", plant: "Spring", harvest: "Summer" },
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("plantations")
        .setDescription("Displays a list of available plantations and their growth cycles."),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('🌱 Plantation Cycles')
            .setDescription('Find the best times to plant and harvest:')
            .setThumbnail('https://i.imgur.com/zKXRZdz.png')
            .setTimestamp()
            .setFooter({ text: 'Plantations', iconURL: 'https://i.imgur.com/zKXRZdz.png' });

        plantations.forEach(p => {
            embed.addFields({ name: p.name, value: `Plant in: **${p.plant}**\nHarvest in: **${p.harvest}**`, inline: false });
        });

        await interaction.reply({ embeds: [embed] });
    },
};
