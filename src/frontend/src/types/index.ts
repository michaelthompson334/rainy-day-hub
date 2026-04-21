export type TabCategory = "articles" | "photography" | "resources" | "sounds";

export interface ExternalLink {
  id: string;
  title: string;
  description: string;
  url: string;
  category: TabCategory;
  imageUrl?: string;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}
