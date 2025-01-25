const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Function to load items from the JSON file
function loadItemsFromJson() {
    const filePath = path.join(__dirname, 'items.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("market")
        .setDescription("View items for sale organized by categories."),
    async execute(interaction) {
        const market = loadItemsFromJson();
        const categories = Object.keys(market);

        const options = categories.map(category => ({
            label: category,
            value: category
        }));

        const menu = new StringSelectMenuBuilder()
            .setCustomId("select_category")
            .setPlaceholder("Choose a category")
            .addOptions(options);

        const rowMenu = new ActionRowBuilder().addComponents(menu);

        await interaction.reply({
            content: "📋 **Choose a category to view available items:**",
            components: [rowMenu],
            ephemeral: true
        });

        const collector = interaction.channel.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 60000
        });

        collector.on("collect", async i => {
            if (i.customId === "select_category" && i.user.id === interaction.user.id) {
                const selectedCategory = i.values[0];
                const items = market[selectedCategory];
                let embeds = [];
                let embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle(`Available items in ${selectedCategory}`)
                    .setDescription('Here are the items you can buy:')
                    .setTimestamp()
                    .setFooter({ text: 'Market', iconURL: 'https://i.imgur.com/zKXRZdz.png' });

                let count = 0;
                for (const item of items) {
                    if (count >= 25) { // Limit of fields per embed
                        embeds.push(embed);
                        embed = new EmbedBuilder()
                            .setColor('#0099ff')
                            .setTitle(`More items in ${selectedCategory}`)
                            .setTimestamp()
                            .setFooter({ text: 'Market', iconURL: 'https://i.imgur.com/zKXRZdz.png' });
                        count = 0;
                    }
                    embed.addFields({ name: item.Nome, value: `💰 ${item.Valor}`, inline: true });
                    count++;
                }
                embeds.push(embed); // Add the last embed

                // Ensure the interaction is initially replied to or deferred
                if (!i.deferred && !i.replied) {
                    await i.reply({ content: 'Processing your request...', ephemeral: true });
                }

                // Send follow-up messages for each embed
                for (const embed of embeds) {
                    await i.followUp({ embeds: [embed], ephemeral: true });
                }
            } else {
                if (!i.deferred && !i.replied) {
                    await i.reply({ content: "Only the command user can interact with this.", ephemeral: true });
                } else {
                    await i.followUp({ content: "Only the command user can interact with this.", ephemeral: true });
                }
            }
        });

        collector.on("end", () => {
            console.log("Collector ended.");
        });
    },
};
