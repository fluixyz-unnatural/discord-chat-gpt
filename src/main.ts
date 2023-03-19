import { Message, Client } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import { interact } from "./chat";

dotenv.config();
let generating = false;

const fire = async () => {
  const openAIConfiguration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  const openai = new OpenAIApi(openAIConfiguration);
  const client = new Client({
    intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
  });

  client.once("ready", () => {
    console.log("Ready!");
    console.log(client.user.tag);
  });

  client.on("messageCreate", async (message: Message) => {
    if (message.author.bot || generating || (message.channel as any).name !== "bot") return;
    generating = true;
    const sentMessage = await message.channel.send("`回答を生成中…`");
    const res = await interact(message.content, openai).catch((err) => {
      sentMessage.edit(`\`ERROR: ${err.message}\``);
    });
    if (res) await sentMessage.edit(res.content);
    generating = false;
  });

  client.login(process.env.TOKEN);
};
fire();
