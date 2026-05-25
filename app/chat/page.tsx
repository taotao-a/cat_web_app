"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { cats } from "@/mock/cats";
import type { Cat } from "@/types/cat";
import { getSelectedCat } from "@/lib/mock-api";
import { getUserState } from "@/lib/storage";

export default function ChatPage() {
  const [cat, setCat] = useState<Cat>(cats[0]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCat(getSelectedCat(getUserState().selectedCatId));
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <AppShell>
      <ChatPanel cat={cat} />
    </AppShell>
  );
}
