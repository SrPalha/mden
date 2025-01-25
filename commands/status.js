const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Displays the current status of the bot."),
    async execute(interaction) {
        const guild = interaction.guild;

        // Bot uptime
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        // Total members in the server
        const totalMembers = guild.memberCount;

        // Number of moderators (assuming mods have a role called "Mod" or similar)
        const mods = guild.roles.cache.find(role => role.name.toLowerCase().includes("mod"));
        const modCount = mods ? mods.members.size : 0;

        // Server age
        const serverCreationDate = guild.createdAt;
        const serverAge = Math.floor((Date.now() - serverCreationDate) / (1000 * 60 * 60 * 24)); // Age in days

        // Bot name and number of commands
        const botName = interaction.client.user.username;
        const commandCount = interaction.client.commands.size;

        // Creating the embed
        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("🤖 Bot Status")
            .setThumbnail(interaction.client.user.displayAvatarURL()) // Bot icon
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .addFields(
                { name: "🤖 Bot", value: botName, inline: true },
                { name: "🕒 Uptime", value: `${hours}h ${minutes}m ${seconds}s`, inline: true },
                { name: "⚙️ Available Commands", value: `${commandCount}`, inline: true },
                { name: "👥 Server Members", value: `${totalMembers}`, inline: true },
                { name: "🔨 Moderators", value: `${modCount}`, inline: true },
                { name: "🏰 Server Age", value: `${serverAge} days`, inline: true },
                { name: "📅 Server Created On", value: serverCreationDate.toDateString(), inline: false },
                { name: "🛠️ Bot Creator", value: `<@386364477001695232>`, inline: false }
            );

        // Send the embed as an ephemeral response
        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
