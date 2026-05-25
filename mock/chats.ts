import type { ChatMessage } from "@/types/chat";

export const initialChatMessages: ChatMessage[] = [
  {
    id: "welcome",
    catId: "fubao",
    sender: "cat",
    content: "今天也想和你待在一起。有什么想说的，都可以慢慢告诉我。",
    createdAt: new Date().toISOString(),
  },
];

export const companionTasks = [
  "和猫咪说一句今天最想说的话",
  "记录今天让你开心的一件小事",
  "给自己一句鼓励",
  "和猫咪聊聊最近的烦恼",
  "睡前让猫咪陪你说晚安",
];

export const moods = ["开心", "平静", "有点累", "难过", "焦虑", "想被陪伴"];
