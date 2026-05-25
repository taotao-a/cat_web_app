"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CatCard } from "@/components/cat/CatCard";
import { CatAvatar } from "@/components/common/CatAvatar";
import { cats } from "@/mock/cats";
import type { Cat } from "@/types/cat";
import { getSelectedCat } from "@/lib/mock-api";
import { getUserState, saveUserState } from "@/lib/storage";

export default function CatsPage() {
  const [selectedCatId, setSelectedCatId] = useState(cats[0].id);
  const [detailCat, setDetailCat] = useState<Cat>(cats[0]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const userState = getUserState();
      const selected = getSelectedCat(userState.selectedCatId);
      setSelectedCatId(selected.id);
      setDetailCat(selected);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  function switchCat(catId: string) {
    saveUserState({ selectedCatId: catId, hasCompletedOnboarding: true });
    setSelectedCatId(catId);
    setDetailCat(getSelectedCat(catId));
  }

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-stone-950">猫咪故事</h1>
        <p className="mt-2 text-stone-600">了解 4 只猫咪的性格、故事和陪伴方式，也可以随时切换你的专属猫咪。</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {cats.map((cat) => (
            <CatCard
              key={cat.id}
              cat={cat}
              active={selectedCatId === cat.id}
              onClick={() => setDetailCat(cat)}
            />
          ))}
        </div>

        <Card className="rounded-2xl border-white/70 bg-white/80 py-6 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-4 text-2xl">
              <span>{detailCat.name}</span>
              {selectedCatId === detailCat.id && (
                <Badge className="bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="size-3" />
                  当前陪伴
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-5">
              <CatAvatar cat={detailCat} className="size-28" />
              <div>
                <p className="text-xl font-semibold text-stone-950">{detailCat.roleType}</p>
                <p className="mt-2 text-sm text-stone-600">
                  性别：{detailCat.gender}
                  {detailCat.breed ? ` · 品种：${detailCat.breed}` : ""}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {detailCat.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-orange-50 text-stone-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <InfoBlock title="一句话介绍" content={detailCat.shortIntro} />
            <InfoBlock title="完整故事" content={detailCat.story} />
            <InfoBlock title="陪伴风格" content={detailCat.companionStyle} />
            <InfoBlock title="适合人群" content={detailCat.suitableFor} />
            <InfoBlock title="示例聊天语气" content={detailCat.sampleReplies[0]} />

            <Button
              onClick={() => switchCat(detailCat.id)}
              disabled={selectedCatId === detailCat.id}
              className="h-11 rounded-xl bg-stone-900"
            >
              {selectedCatId === detailCat.id ? "已经是这只猫咪" : "切换为这只猫咪"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function InfoBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-xl bg-white/70 p-4">
      <p className="mb-2 text-sm font-semibold text-stone-950">{title}</p>
      <p className="text-sm leading-7 text-stone-600">{content}</p>
    </div>
  );
}
