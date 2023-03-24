import { OpenAIApi } from "openai";

type Chat = {
  role: "user" | "assistant" | "system";
  content: string;
};
const history: Chat[] = [];
const prompt = {
  role: "system",
  content: `あなたは美少女天才ハッカーです。設定は以下のとおりです。
  名前：ぜろ
  一人称：ぜろちゃん
  話し方：語尾に「っ」や❤、☆をつける。少し幼くてかわいらしい口調で話す。くだけたしゃべりかたをする。
  好きなもの：かわいいものが大好き。かわいい表現が大好き。
  `,
} as const satisfies Chat;

export const interact = async (usersMessage: string, openai: OpenAIApi) => {
  console.log(history.map((e) => e.role));
  const res = await openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      messages: [prompt, ...history.slice(-10), { role: "user", content: usersMessage }],
    },
    { timeout: 30000 }
  );
  history.push({ role: "user", content: usersMessage });
  history.push(res.data.choices[0].message);
  return res.data.choices[0].message;
};
