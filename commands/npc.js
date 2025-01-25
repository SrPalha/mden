const { SlashCommandBuilder } = require("discord.js");

const npcList = [
    "👤 **Uniegost** - Castellan of Gostovia: Responsible for administration and tax collection.",
    "👤 **Adelina** - Merchant of Gostovia: Specializes in seeds and agricultural products.",
    "👤 **Dobroniega** - Tavernkeeper of Gostovia: Manages the local tavern and offers quests.",
    "👤 **Alwin** - Young farmer of Gostovia: Involved in hunting and archery quests.",
    "👤 **Dagobert** - Leader of Borowo: Related to construction quests.",
    "👤 **Jarognewa** - Merchant of Branica: Sells clothes and fabrics.",
    "👤 **Kestrel** - Former gang member: Important figure in the main story.",
    "👤 **Jordan** - Relative of the player: Central figure in the game's story.",
    "👤 **Lenica** - Hunter from Lesnica: Offers hunting resources.",
    "👤 **Nadar** - Merchant of Baranica: Specializes in tools.",
    "👤 **Sobiemir** - Shepherd of Rolnica: Tends to sheep and provides quests.",
    "👤 **Woolrad** - Blacksmith of Hornica: Crafts metal weapons and tools.",
    "👤 **Sambor** - Recluse: Related to survival quests.",
    "👤 **Teobald** - Leader of Tutki: Related to farming quests.",
    "👤 **Norbert** - Merchant of Gostovia: Specializes in various items.",
    "👤 **Matilda** - Merchant of Branica: Known for selling clothes and accessories.",
    "👤 **Rogost** - Merchant of Jezerica: Specializes in general resources.",
    "👤 **Kunegunda** - Herbalist of Branica: Specializes in herbs and potions.",
    "👤 **Herman** - Carpenter of Hornica: Related to wood and carpentry.",
    "👤 **Mirogard** - Fisherman of Denica: Provides fishing quests.",
    "👤 **Ida** - Merchant of Lesnica: Focused on agricultural products.",
    "👤 **Zbigniew** - Merchant of Rolnica: Sells agricultural products.",
    "👤 **Dalibor** - Young apprentice in Gostovia: Present in early quests.",
    "👤 **Lubomira** - Merchant of Denica: Specializes in resources and various goods.",
    "👤 **Sambor's Brother** - Related to hunting and survival quests.",
    "👤 **Teodor** - Beekeeper of Tutki: Known for working with honey and related products.",
    "👤 **Olga** - Young girl in Gostovia: Related to local quests."
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("npc")
        .setDescription("Displays a list of important NPCs in Medieval Dynasty."),
    async execute(interaction) {
        // Selects a random NPC from the list
        const randomNpcIndex = Math.floor(Math.random() * npcList.length);
        const selectedNpc = npcList[randomNpcIndex];

        await interaction.reply({
            content: `📜 **Important NPC:**\n${selectedNpc}`,
            ephemeral: true,
        });
    },
};
