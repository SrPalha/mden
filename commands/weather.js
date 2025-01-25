const { SlashCommandBuilder } = require("discord.js");

const weatherTips = [
    "🌞 **Sunny**: Perfect for working in the fields.",
    "⛅ **Partly Cloudy**: Ideal for exploring the surroundings.",
    "🌧️ **Rainy**: Make sure your villagers stay dry.",
    "❄️ **Snowing**: Dress your villagers warmly and prepare for intense cold!",
    "🌪️ **Stormy**: Avoid going outside and protect your buildings.",
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("Get a random weather tip."),
    async execute(interaction) {
        const weatherTip = weatherTips[Math.floor(Math.random() * weatherTips.length)];
        await interaction.reply({ content: `🌤️ **Weather Tip:** ${weatherTip}`, ephemeral: true });
    },
};
