"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cat, Crown, Home, MessageCircle, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "首页", icon: Home },
  { href: "/chat", label: "聊天", icon: MessageCircle },
  { href: "/cats", label: "猫咪", icon: Cat },
  { href: "/membership", label: "会员", icon: Crown },
  { href: "/profile", label: "我的", icon: UserRound },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#fff8ee_0%,#ffeef5_42%,#edf8ff_100%)] text-stone-900">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/home" className="flex items-center gap-2 font-semibold text-stone-900">
            <span className="flex size-9 items-center justify-center rounded-lg bg-orange-200 text-orange-800">
              <Cat className="size-5" />
            </span>
            AI 猫咪陪伴
          </Link>
          <nav className="flex items-center gap-1 rounded-xl bg-white/70 p-1 shadow-sm ring-1 ring-stone-200/70">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-stone-600 transition hover:bg-orange-50 hover:text-stone-950",
                    isActive && "bg-stone-900 text-white hover:bg-stone-900 hover:text-white"
                  )}
                >
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
    </div>
  );
}
