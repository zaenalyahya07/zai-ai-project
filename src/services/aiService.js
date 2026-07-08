import axios from "axios";

const API_URL = import.meta.env.VITE_AI_API_URL;
const API_KEY = import.meta.env.VITE_AI_API_KEY;

export async function sendMessageToAI(message) {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gagal mengirim pesan ke AI:", error);
    throw new Error("Terjadi kesalahan saat menghubungi AI.");
  }
}
