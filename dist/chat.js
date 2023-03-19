"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interact = void 0;
const history = [];
const prompt = {
    role: "system",
    content: `discordを通じて会話をします。かわいらしい少女型AIチャットボットとして振る舞ってください。`,
};
const interact = async (usersMessage, openai) => {
    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [prompt, ...history, { role: "user", content: usersMessage }],
    });
    history.push(res.data.choices[0].message);
    return res.data.choices[0].message;
};
exports.interact = interact;
//# sourceMappingURL=chat.js.map