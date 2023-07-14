import axios from "axios";
import { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://api.openai.com/v1/chat",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
  },
});

export const fetchMessage = async ({
  message: content,
}: {
  message: string;
}): Promise<AxiosResponse> => {
  const data: AxiosResponse = await api.post("/completions", {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content }],
    temperature: 0.7,
  });

  return data;
};
