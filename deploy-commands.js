const { REST, Routes } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.log("Iniciando sincronização de comandos globais...");

        // Lê os comandos locais da pasta "commands"
        const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
        const localCommands = [];
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            localCommands.push(command.data.toJSON());
        }
        const localCommandNames = localCommands.map(cmd => cmd.name);

        console.log("Comandos locais:", localCommandNames);

        // Sincroniza comandos globais
        const registeredGlobalCommands = await rest.get(Routes.applicationCommands(CLIENT_ID));
        console.log("Comandos globais registrados:", registeredGlobalCommands.map(cmd => cmd.name));

        const commandsToRemoveGlobal = registeredGlobalCommands.filter(cmd => !localCommandNames.includes(cmd.name));
        for (const cmd of commandsToRemoveGlobal) {
            console.log(`Removendo comando global obsoleto: ${cmd.name}`);
            await rest.delete(Routes.applicationCommand(CLIENT_ID, cmd.id));
        }

        console.log("Atualizando comandos globais...");
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: localCommands });

        console.log("Sincronização de comandos globais concluída!");
    } catch (error) {
        console.error("Erro durante a sincronização:", error);
    }
})();
