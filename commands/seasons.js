const { SlashCommandBuilder } = require("discord.js");

const seasons = [
    { name: "🌸 Spring", impact: "Initial planting season" },
    { name: "☀️ Summer", impact: "Crop growth and harvesting" },
    { name: "🍂 Autumn", impact: "Planting rye and oats" },
    { name: "❄️ Winter", impact: "Severe cold, need for firewood and stored food" },
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("seasons")
        .setDescription("Displays information about the seasons in the game."),
    async execute(interaction) {
        const response = seasons
            .map(s => `${s.name} - 🌟 **Impact:** ${s.impact}\n`)
            .join("\n");
        await interaction.reply({
            content: `📋 **Seasons in the Game:**\n${response}`,
            ephemeral: true, // Sets the message as ephemeral
        });
    },
};
