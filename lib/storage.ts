"use client";

import type { ChatMessage } from "@/types/chat";
import type { UserState } from "@/types/user";
import { defaultUserState } from "@/mock/user";

const USER_STATE_KEY = "catCompanion.userState";
const CHAT_HISTORY_KEY = "catCompanion.chatHistory";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function getUserState(): UserState {
  if (!canUseStorage()) return defaultUserState;

  const raw = window.localStorage.getItem(USER_STATE_KEY);
  if (!raw) return defaultUserState;

  try {
    return { ...defaultUserState, ...JSON.parse(raw) };
  } catch {
    return defaultUserState;
  }
}

export function saveUserState(nextState: Partial<UserState>) {
  if (!canUseStorage()) return;
  const currentState = getUserState();
  window.localStorage.setItem(USER_STATE_KEY, JSON.stringify({ ...currentState, ...nextState }));
}

export function completeOnboarding(selectedCatId: string) {
  saveUserState({ hasCompletedOnboarding: true, selectedCatId });
}

export function clearLocalData() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(USER_STATE_KEY);
  window.localStorage.removeItem(CHAT_HISTORY_KEY);
}

export function getChatHistory(catId: string): ChatMessage[] {
  if (!canUseStorage()) return [];
  const raw = window.localStorage.getItem(CHAT_HISTORY_KEY);
  if (!raw) return [];

  try {
    const messages = JSON.parse(raw) as ChatMessage[];
    return messages.filter((message) => message.catId === catId);
  } catch {
    return [];
  }
}

export function saveChatHistory(messages: ChatMessage[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
}

export function appendChatMessages(newMessages: ChatMessage[]) {
  if (!canUseStorage()) return;
  const raw = window.localStorage.getItem(CHAT_HISTORY_KEY);
  let currentMessages: ChatMessage[] = [];
  try {
    currentMessages = raw ? (JSON.parse(raw) as ChatMessage[]) : [];
  } catch {
    currentMessages = [];
  }
  saveChatHistory([...currentMessages, ...newMessages]);
}
