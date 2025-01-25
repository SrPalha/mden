const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType, EmbedBuilder } = require("discord.js");

const categorias = {
    "🏠 Houses": [
        { 
            nome: "Small Simple House", 
            funcao: "Houses residents", 
            tecnologia: "0 Building Technology",
            capacidade: "50 kg",
            materiais: "25 Logs, 66 Sticks, 32 Straw, 10 Stones or 8 Logs"
        },
        { 
            nome: "Simple House", 
            funcao: "Houses residents", 
            tecnologia: "250 Building Technology",
            capacidade: "50 kg",
            materiais: "32 Logs, 80 Sticks, 48 Straw, 12 Stones or 10 Logs"
        },
        { 
            nome: "House", 
            funcao: "Houses more residents", 
            tecnologia: "1,500 Building Technology",
            capacidade: "50 kg",
            materiais: "34 Logs, 106 Sticks, 60 Straw, 14 Stones"
        },
    ],
    "🌾 Agricultural Buildings": [
        { 
            nome: "Field", 
            funcao: "Area for cultivation", 
            tecnologia: "-",
            capacidade: "-",
            materiais: "-"
        },
        { 
            nome: "Barn I", 
            funcao: "Stores and processes agricultural resources", 
            tecnologia: "10 Farming Technology",
            capacidade: "N/A",
            materiais: "35 Logs, 64 Sticks, 48 Straw"
        },
        { 
            nome: "Barn II", 
            funcao: "Improved version of Barn I", 
            tecnologia: "1,500 Farming Technology",
            capacidade: "N/A",
            materiais: "51 Logs, 48 Straw, 12 Stones"
        },
        { 
            nome: "Barn III", 
            funcao: "Advanced version of the barn", 
            tecnologia: "8,000 Farming Technology",
            capacidade: "N/A",
            materiais: "27 Logs, 36 Planks, 76 Stones"
        },
        { 
            nome: "Farm Shed", 
            funcao: "Place for farming tools", 
            tecnologia: "15 Farming Technology",
            capacidade: "N/A",
            materiais: "10 Logs, 16 Sticks, 16 Straw, 8 Stones"
        },
        { 
            nome: "Windmill", 
            funcao: "Flour production", 
            tecnologia: "10,000 Farming Technology",
            capacidade: "N/A",
            materiais: "77 Logs, 58 Planks"
        },
    ],
    "🐴 Animal Buildings": [
        { 
            nome: "Henhouse", 
            funcao: "Houses chickens", 
            tecnologia: "50 Farming Technology",
            capacidade: "N/A",
            materiais: "6 Stones, 12 Logs, 30 Sticks, 24 Straw"
        },
        { 
            nome: "Pigsty", 
            funcao: "Houses pigs", 
            tecnologia: "100 Farming Technology",
            capacidade: "N/A",
            materiais: "8 Stones, 18 Logs, 54 Sticks, 12 Straw"
        },
        { 
            nome: "Stable", 
            funcao: "Houses horses", 
            tecnologia: "2,000 Farming Technology",
            capacidade: "N/A",
            materiais: "12 Stones, 48 Logs, 48 Straw, 8 Planks"
        },
        { 
            nome: "Goose House", 
            funcao: "Houses geese", 
            tecnologia: "500 Farming Technology",
            capacidade: "N/A",
            materiais: "6 Stones, 13 Logs, 42 Sticks, 16 Straw"
        },
        { 
            nome: "Sheepfold", 
            funcao: "Houses sheep", 
            tecnologia: "2,500 Farming Technology",
            capacidade: "N/A",
            materiais: "10 Stones, 19 Logs, 62 Sticks, 32 Straw"
        },
        { 
            nome: "Cowshed", 
            funcao: "Houses cows", 
            tecnologia: "3,500 Farming Technology",
            capacidade: "N/A",
            materiais: "10 Stones, 26 Logs, 104 Sticks, 32 Straw"
        },
        { 
            nome: "Apiary", 
            funcao: "Honey production", 
            tecnologia: "5,000 Farming Technology",
            capacidade: "N/A",
            materiais: "6 Stones, 6 Logs, 16 Straw"
        },
    ],
    "⚒️ Production Buildings": [
        { 
            nome: "Workshop I", 
            funcao: "Basic tool production", 
            tecnologia: "10 Production Technology",
            capacidade: "N/A",
            materiais: "12 Logs, 32 Straw +base"
        },
        { 
            nome: "Workshop II", 
            funcao: "Intermediate tool production", 
            tecnologia: "250 Production Technology",
            capacidade: "N/A",
            materiais: "40 Logs, 24 Planks +base"
        },
        { 
            nome: "Smithy I", 
            funcao: "Basic forge", 
            tecnologia: "50 Production Technology",
            capacidade: "N/A",
            materiais: "15 Logs, 8 Stones, 22 Sticks, 32 Straw"
        },
    ],
    "📦 Storage Buildings": [
        { 
            nome: "Resource Storage I", 
            funcao: "Stores resources", 
            tecnologia: "50 Building Technology",
            capacidade: "1,000 kg",
            materiais: "34 Logs, 110 Sticks, 40 Straw +base"
        },
        { 
            nome: "Food Storage I", 
            funcao: "Stores food", 
            tecnologia: "5 Farming Technology",
            capacidade: "500 kg",
            materiais: "42 Logs, 62 Sticks, 32 Straw +base"
        },
    ],
    "🍺 Service Buildings": [
        { 
            nome: "Market Stall", 
            funcao: "Trade and sell goods", 
            tecnologia: "2,500 Production Technology",
            capacidade: "N/A",
            materiais: "8 Logs, 8 Planks, 8 Linen Fabric"
        },
        { 
            nome: "Builder's Hut", 
            funcao: "Construction and repair", 
            tecnologia: "7,500 Building Technology",
            capacidade: "N/A",
            materiais: "18 Logs, 64 Sticks, 32 Straw"
        },
    ],
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("buildings")
        .setDescription("Shows building categories and their functions in the game."),
    async execute(interaction) {
        const options = Object.keys(categorias).map(categoria => ({
            label: categoria,
            value: categoria,
        }));

        const menu = new StringSelectMenuBuilder()
            .setCustomId("select_category")
            .setPlaceholder("Choose a building category")
            .addOptions(options);

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.reply({
            content: "Select a category to view the available buildings:",
            components: [row],
            ephemeral: true,
        });

        const collector = interaction.channel.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 60000,
        });

        collector.on("collect", async i => {
            if (i.customId === "select_category" && i.user.id === interaction.user.id) {
                const selectedCategory = i.values[0];
                const buildings = categorias[selectedCategory];

                const embed = new EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle(`Buildings: ${selectedCategory}`)
                    .setDescription("Below are the details of the available buildings in this category:");

                buildings.forEach(item => {
                    embed.addFields({
                        name: `• ${item.nome}`,
                        value: `**Function:** ${item.funcao}\n🔹 **Technology:** ${item.tecnologia}\n🔹 **Capacity:** ${item.capacidade}\n🔹 **Materials:** ${item.materiais}`,
                        inline: false,
                    });
                });

                await i.reply({
                    embeds: [embed],
                    ephemeral: true,
                });
            } else {
                await i.reply({ content: "Only the command user can interact with this.", ephemeral: true });
            }
        });

        collector.on("end", () => {
            console.log("Collector ended.");
        });
    },
};
