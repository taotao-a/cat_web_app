import type { Cat } from "@/types/cat";
import type { ChatMessage } from "@/types/chat";
import { cats, getCatById } from "@/mock/cats";

export function getCats() {
  return cats;
}

export function getSelectedCat(catId?: string) {
  return getCatById(catId);
}

export function getMockCatReply(cat: Cat, userMessage?: string) {
  const messageLength = userMessage?.trim().length ?? 0;
  const index = messageLength % cat.sampleReplies.length;
  return cat.sampleReplies[index] ?? cat.sampleReplies[0];
}

export function createChatMessage(catId: string, sender: ChatMessage["sender"], content: string): ChatMessage {
  return {
    id: `${sender}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    catId,
    sender,
    content,
    createdAt: new Date().toISOString(),
  };
}

export function getMoodReply(cat: Cat, mood: string) {
  const map: Record<string, string> = {
    开心: `${cat.name}也替你开心。这样的小亮光值得被好好记住。`,
    平静: `平静也很好呀。${cat.name}会陪你把今天慢慢过完。`,
    有点累: `我知道啦，今天你有点累。那我们就不勉强自己，慢慢休息一下。`,
    难过: `难过的时候不用急着变好。${cat.name}会先陪你待一会儿。`,
    焦虑: `先把呼吸放慢一点点。现在我们只处理眼前这一小步。`,
    想被陪伴: `那就来我身边吧。今天不用一个人撑着。`,
  };

  return map[mood] ?? cat.sampleReplies[0];
}
