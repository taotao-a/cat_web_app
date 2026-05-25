export type ChatSender = "user" | "cat";

export type ChatMessage = {
  id: string;
  catId: string;
  sender: ChatSender;
  content: string;
  createdAt: string;
};
