const { Client, GatewayIntentBits, ActivityType, Collection } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;

// ID do canal para comandos
const CMD_CHANNEL_ID = "1324079965960146965";

// Inicialização do cliente Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

// Executar automaticamente o script de registro de comandos
(async () => {
    console.log("Registrando comandos...");
    require("./deploy-commands.js");
})();

// Carregar os comandos da pasta "commands"
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`Comando carregado: ${command.data.name}`);
}

// Evento: Bot está pronto
client.on("ready", (c) => {
    console.log(`✅ ${c.user.tag} está online.`);

    // Definir presença inicial com Rich Presence customizado
    client.user.setPresence({
        activities: [
            {
                name: "Medieval Dynasty",
                type: ActivityType.Playing, // Tipo de atividade (Jogando)
                assets: {
                    largeImage: "dy", // Nome exato do asset configurado no Developer Portal
                    largeText: "Logo de Medieval Dynasty", // Texto exibido ao passar o mouse
                    smallImage: "embedded_cover", // Nome do asset menor (se configurado)
                    smallText: "Logo do jogo", // Texto ao passar o mouse na imagem menor
                },
            },
        ],
        status: "online", // Status do bot
    });

    console.log("Rich Presence configurado.");
});

// Evento: Lidar com interações (slash commands)
client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Ocorreu um erro ao executar este comando!", ephemeral: true });
        }
    } 
    // Lidar com interações do Select Menu
    else if (interaction.isStringSelectMenu()) {
        // Garantir que a interação é do tipo selectCategoria
        if (interaction.customId === 'selectCategoria') {
            const categoriaSelecionada = interaction.values[0];
            const mercado = require('./commands/mercado').loadItemsFromJson(); // Carregar os itens do JSON

            // Buscar os itens da categoria selecionada
            const itens = mercado[categoriaSelecionada];

            // Criar a mensagem com os itens dessa categoria
            let itensFormatados = itens
                .map(({ item, preco }) => `📦 **${item}:** ${preco}`)
                .join("\n");

            // Dividir a mensagem em partes menores se exceder o limite de 2000 caracteres
            const partesMensagem = splitMessage(itensFormatados);

            // Enviar todas as partes da mensagem
            for (let i = 0; i < partesMensagem.length; i++) {
                const part = partesMensagem[i];
                await interaction.followUp({
                    content: `**Itens da categoria ${categoriaSelecionada}:**\n\n${part}`,
                    ephemeral: true,
                });
            }
        }
    }
});

// Login do bot
client.login(TOKEN);
