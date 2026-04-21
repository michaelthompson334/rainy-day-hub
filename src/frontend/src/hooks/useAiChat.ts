import type { ChatMessage } from "@/types";
import { useCallback, useState } from "react";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const RAIN_BOT_RESPONSES = [
  "The sound of rain on leaves is called petrichor — the earthy scent released when rain hits dry soil. Nature's own aromatherapy.",
  "Rainy days are perfect for diving into a good book. What genre are you in the mood for — cozy mystery, literary fiction, or something adventurous?",
  "Some composers wrote their best work during storms. Chopin, Debussy, and even Beethoven found inspiration in the rhythm of rain.",
  "A warm cup of tea and a rainy window — few things beat that combination. Chamomile for calm, green tea for focus, black tea for energy.",
  "Rainy days lower the air pressure, which can make us feel more contemplative and introspective. Perfect for journaling or creative writing.",
  "The Japanese concept 'Ame-agari' (雨上がり) describes the beautiful clarity after rain — everything washed clean and glittering.",
  "Ambient rain sounds can boost focus and creativity by masking distracting noise. Try pairing it with soft instrumental music.",
  "There's something magical about city rain at night — the way lights reflect off wet streets and the world seems softer.",
  "Frogs and other amphibians are most active during rain. If you listen closely outside, you might hear a whole chorus.",
  "Rain photography can be breathtaking — long exposures, bokeh from streetlights, and the textures of water droplets on glass.",
];

let responseIndex = 0;

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm Rain-Bot, your cozy companion for rainy days. 🌧️ Ask me anything — about rain, what to do on a rainy day, or just chat!",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate a thoughtful response delay
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 700),
    );

    const response =
      RAIN_BOT_RESPONSES[responseIndex % RAIN_BOT_RESPONSES.length];
    responseIndex++;

    const assistantMessage: ChatMessage = {
      id: generateId(),
      role: "assistant",
      content: response,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  }, []);

  return { messages, sendMessage, isLoading };
}
