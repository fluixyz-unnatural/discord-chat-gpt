import { Message, Client } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import { interact } from "./chat";

dotenv.config();
let generating = false;

const init = async () => {
  const openAIConfiguration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(openAIConfiguration);

  const client = new Client({
    intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
  });

  client.once("ready", () => {
    console.log("Ready!");
    console.log(client.user.tag);
  });

  client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) return;
    if (generating) return;
    if ((message.channel as any).name !== "bot") return;
    console.log(message.content);
    generating = true;
    try {
      const sentMessage = await message.channel.send("`回答を生成中…`");
      console.log("completion start");
      const res = await interact(message.content, openai);
      console.log("completion done");
      await sentMessage.edit(res.content);
    } catch (err) {
      console.error(err);
      generating = false;
      return;
    }
    generating = false;
  });

  client.login(process.env.TOKEN);
};

init();
