const Discord = require("discord.js");
const { Client, Collection } = Discord;
const dotenv = require("dotenv");

dotenv.config();

const TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildVoiceStates,
  ],
});

client.slashcommands = new Collection();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  async function handleCommands() {
    if (!interaction.isCommand()) return;

    const slashcmd = client.slashcommands.get(interaction.commandName);
    if (!slashcmd) interaction.reply("Not a valid slash command");

    await interaction.deferReply();
    await slashcmd.run({ client, interaction });
  }
  handleCommands();
});

client.login(TOKEN);
