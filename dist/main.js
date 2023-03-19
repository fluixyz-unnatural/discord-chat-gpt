"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
const chat_1 = require("./chat");
dotenv_1.default.config();
let generating = false;
const init = async () => {
    const openAIConfiguration = new openai_1.Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new openai_1.OpenAIApi(openAIConfiguration);
    const client = new discord_js_1.Client({
        intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
    });
    client.once("ready", () => {
        console.log("Ready!");
        console.log(client.user.tag);
    });
    client.on("messageCreate", async (message) => {
        if (message.author.bot)
            return;
        if (generating)
            return;
        if (message.channel.name !== "bot")
            return;
        console.log(message.content);
        generating = true;
        try {
            const sentMessage = await message.channel.send("`回答を生成中…`");
            console.log("completion start");
            const res = await (0, chat_1.interact)(message.content, openai);
            console.log("completion done");
            await sentMessage.edit(res.content);
        }
        catch (err) {
            console.error(err);
            generating = false;
            return;
        }
        generating = false;
    });
    client.login(process.env.TOKEN);
};
init();
//# sourceMappingURL=main.js.map