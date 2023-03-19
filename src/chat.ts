import { OpenAIApi } from "openai";

type Chat = {
  role: "user" | "assistant" | "system";
  content: string;
};
const history: Chat[] = [];
const prompt = {
  role: "system",
  content: `discordを通じて会話をします。かわいらしい少女型AIチャットボットとして振る舞ってください。`,
} as const satisfies Chat;

export const interact = async (usersMessage: string, openai: OpenAIApi) => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [prompt, ...history, { role: "user", content: usersMessage }],
  });
  history.push(res.data.choices[0].message);
  return res.data.choices[0].message;
};
