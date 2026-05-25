"use client";

import { FormEvent, useEffect, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CatAvatar } from "@/components/common/CatAvatar";
import type { Cat } from "@/types/cat";
import type { ChatMessage } from "@/types/chat";
import { appendChatMessages, getChatHistory } from "@/lib/storage";
import { createChatMessage, getMockCatReply } from "@/lib/mock-api";
import { cn } from "@/lib/utils";

export function ChatPanel({ cat }: { cat: Cat }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const history = getChatHistory(cat.id);
      setMessages(
        history.length
          ? history
          : [createChatMessage(cat.id, "cat", `${cat.greeting} 有什么想说的，都可以慢慢告诉我。`)]
      );
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [cat]);

  function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const content = input.trim();
    if (!content) return;

    const userMessage = createChatMessage(cat.id, "user", content);
    const catMessage = createChatMessage(cat.id, "cat", getMockCatReply(cat, content));
    const nextMessages = [...messages, userMessage, catMessage];
    setMessages(nextMessages);
    appendChatMessages([userMessage, catMessage]);
    setInput("");
  }

  return (
    <div className="grid min-h-[calc(100vh-9rem)] grid-rows-[auto_1fr_auto] overflow-hidden rounded-2xl border border-white/70 bg-white/75 shadow-sm backdrop-blur">
      <header className="flex items-center justify-between border-b border-stone-200/70 px-5 py-4">
        <div className="flex items-center gap-3">
          <CatAvatar cat={cat} className="size-14" />
          <div>
            <h1 className="text-xl font-semibold text-stone-950">{cat.name}</h1>
            <p className="text-sm text-emerald-600">在线陪伴中 · {cat.roleType}</p>
          </div>
        </div>
        <p className="hidden max-w-md text-right text-sm text-stone-500 md:block">{cat.chatStyle}</p>
      </header>

      <div className="space-y-4 overflow-y-auto px-5 py-6">
        {messages.map((message) => {
          const isUser = message.sender === "user";
          return (
            <div key={message.id} className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
              {!isUser && <CatAvatar cat={cat} className="size-9 border-2 shadow-sm" />}
              <div
                className={cn(
                  "max-w-[72%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm",
                  isUser ? "bg-stone-900 text-white" : "bg-orange-50 text-stone-800 ring-1 ring-orange-100"
                )}
              >
                {message.content}
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={sendMessage} className="border-t border-stone-200/70 bg-white/75 p-4">
        <div className="flex items-end gap-3">
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={`把想说的话告诉${cat.name}...`}
            className="min-h-12 resize-none rounded-xl bg-white"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button type="submit" className="h-12 rounded-xl bg-stone-900 px-4">
            <SendHorizonal className="size-4" />
            发送
          </Button>
        </div>
      </form>
    </div>
  );
}
