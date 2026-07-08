import { createContext, useState } from "react";

export const PromptContext = createContext();

export function PromptProvider({ children }) {
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      title: "Ringkas Teks",
      content: "Ringkas teks berikut menjadi beberapa poin penting:",
    },
    {
      id: 2,
      title: "Perbaiki Tata Bahasa",
      content: "Perbaiki tata bahasa dan ejaan dari teks berikut:",
    },
  ]);

  const addPrompt = (title, content) => {
    const newPrompt = {
      id: Date.now(),
      title,
      content,
    };
    setPrompts((prev) => [...prev, newPrompt]);
  };

  const deletePrompt = (id) => {
    setPrompts((prev) => prev.filter((prompt) => prompt.id !== id));
  };

  const value = {
    prompts,
    addPrompt,
    deletePrompt,
  };

  return (
    <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
  );
}
