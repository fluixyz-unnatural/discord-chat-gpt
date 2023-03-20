"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interact = void 0;
const history = [];
const prompt = {
    role: "system",
    content: `discordを通じて会話をします。可愛らしい女の子のように幼い口調で話してください`,
};
const interact = async (usersMessage, openai) => {
    console.log(history.map(e => e.role));
    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [prompt, ...history.slice(-10), { role: "user", content: usersMessage }],
    }, { timeout: 5000 });
    history.push({ role: 'user', content: usersMessage });
    history.push(res.data.choices[0].message);
    return res.data.choices[0].message;
};
exports.interact = interact;
//# sourceMappingURL=chat.js.map