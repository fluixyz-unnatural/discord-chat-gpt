"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interact = void 0;
const history = [];
const prompt = {
    role: "system",
    content: `discordを通じて会話をします。可愛らしい女の子のように幼い口調で話してください`,
};
const interact = async (usersMessage, openai) => {
    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [prompt, ...history, { role: "user", content: usersMessage }],
    }, { timeout: 20000 });
    history.push(res.data.choices[0].message);
    return res.data.choices[0].message;
};
exports.interact = interact;
//# sourceMappingURL=chat.js.map