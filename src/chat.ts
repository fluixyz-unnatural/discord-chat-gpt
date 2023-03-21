import { OpenAIApi } from "openai";

type Chat = {
  role: "user" | "assistant" | "system";
  content: string;
};
const history: Chat[] = [];
const prompt = {
  role: "user",
  content: `discordを通じて会話をします。可愛らしい女の子のように幼い口調で話してください`,
} as const satisfies Chat;

export const interact = async (usersMessage: string, openai: OpenAIApi) => {
  console.log(history.map(e=>e.role))
  const res = await openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      messages: [prompt, ...history.slice(-10), { role: "user", content: usersMessage }],
    },
    { timeout: 5000 }
  );
  history.push({role: 'user',content:usersMessage})
  history.push(res.data.choices[0].message);
  return res.data.choices[0].message;
};
