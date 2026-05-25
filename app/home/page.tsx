"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Crown, HeartPulse, MessageCircle, PawPrint } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CatAvatar } from "@/components/common/CatAvatar";
import { cats } from "@/mock/cats";
import { companionTasks, moods } from "@/mock/chats";
import type { Cat } from "@/types/cat";
import { getMoodReply, getSelectedCat } from "@/lib/mock-api";
import { getUserState } from "@/lib/storage";

export default function HomePage() {
  const [cat, setCat] = useState<Cat>(cats[0]);
  const [selectedMood, setSelectedMood] = useState<string>();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const userState = getUserState();
      setCat(getSelectedCat(userState.selectedCatId));
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const moodReply = selectedMood ? getMoodReply(cat, selectedMood) : undefined;

  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-2xl border-white/70 bg-white/75 py-6 shadow-sm backdrop-blur">
          <CardContent className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <Badge className="bg-orange-100 text-orange-700">今天也想和你待在一起。</Badge>
              <div>
                <h1 className="text-4xl font-semibold text-stone-950">欢迎回来，{cat.name}在这里。</h1>
                <p className="mt-3 max-w-2xl text-lg leading-8 text-stone-600">{cat.greeting}</p>
              </div>
              <Button asChild className="h-11 rounded-xl bg-stone-900 px-5">
                <Link href="/chat">
                  <MessageCircle className="size-4" />
                  开始聊天
                </Link>
              </Button>
            </div>
            <Image
              src={cat.avatar}
              alt={cat.name}
              width={256}
              height={288}
              className="h-72 w-64 rounded-2xl object-cover shadow-xl ring-1 ring-white"
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-white/70 bg-white/75 py-6 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <HeartPulse className="size-5 text-rose-500" />
              今天的心情
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {moods.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setSelectedMood(mood)}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${
                    selectedMood === mood
                      ? "border-orange-300 bg-orange-100 text-orange-800"
                      : "border-stone-200 bg-white/70 text-stone-600 hover:bg-orange-50"
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
            <div className="min-h-20 rounded-xl bg-orange-50 p-4 text-sm leading-6 text-stone-700">
              {moodReply ?? `${cat.name}会在这里等你选择今天的心情。`}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <FeatureCard
          icon={<MessageCircle className="size-5 text-orange-600" />}
          title="和我的猫咪聊天"
          description="把今天发生的事、心里的小情绪，或者任何想说的话告诉它。"
          button="开始聊天"
          href="/chat"
        />
        <FeatureCard
          icon={<BookOpen className="size-5 text-sky-600" />}
          title="了解它的故事"
          description="每只猫咪都有自己的过去、性格和习惯。越了解它，你们的陪伴关系也会越亲密。"
          button="查看猫咪故事"
          href="/cats"
        />
        <FeatureCard
          icon={<Crown className="size-5 text-amber-600" />}
          title="解锁更深度的陪伴"
          description="开通会员后，可以解锁更多聊天次数、专属猫咪故事、亲密度成长、每日问候、陪伴日记等高级功能。"
          button="查看会员权益"
          href="/membership"
        />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-2xl border-white/70 bg-white/75 py-6 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <PawPrint className="size-5 text-orange-600" />
              今日陪伴小任务
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {companionTasks.map((task, index) => (
              <div key={task} className="flex items-center gap-3 rounded-xl bg-white/70 p-3 text-sm text-stone-700">
                <span className="flex size-7 items-center justify-center rounded-lg bg-orange-100 text-xs font-semibold text-orange-700">
                  {index + 1}
                </span>
                {task}
              </div>
            ))}
            <Button asChild variant="outline" className="mt-2 rounded-xl bg-white">
              <Link href="/chat">去完成</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-white/70 bg-white/75 py-6 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">我的陪伴猫咪</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-5">
            <CatAvatar cat={cat} className="size-24" />
            <div className="space-y-3">
              <div>
                <h2 className="text-2xl font-semibold text-stone-950">{cat.name}</h2>
                <p className="text-sm text-stone-500">{cat.roleType}</p>
              </div>
              <p className="text-sm leading-6 text-stone-600">{cat.shortIntro}</p>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white text-stone-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  button,
  href,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  button: string;
  href: string;
}) {
  return (
    <Card className="rounded-2xl border-white/70 bg-white/75 py-6 shadow-sm backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="min-h-20 text-sm leading-6 text-stone-600">{description}</p>
        <Button asChild variant="outline" className="rounded-xl bg-white">
          <Link href={href}>{button}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
