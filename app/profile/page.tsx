"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RotateCcw, Trash2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CatAvatar } from "@/components/common/CatAvatar";
import { cats } from "@/mock/cats";
import type { Cat } from "@/types/cat";
import type { UserState } from "@/types/user";
import { getSelectedCat } from "@/lib/mock-api";
import { clearLocalData, getUserState } from "@/lib/storage";

export default function ProfilePage() {
  const router = useRouter();
  const [userState, setUserState] = useState<UserState>({ hasCompletedOnboarding: false, isMember: false });
  const [cat, setCat] = useState<Cat>(cats[0]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const state = getUserState();
      setUserState(state);
      setCat(getSelectedCat(state.selectedCatId));
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  function resetData() {
    clearLocalData();
    router.push("/onboarding");
  }

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-stone-950">我的</h1>
        <p className="mt-2 text-stone-600">这里展示当前的模拟用户状态，方便后续接入真实账号系统。</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-2xl border-white/70 bg-white/80 py-6 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">当前选择的猫咪</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-5">
            <CatAvatar cat={cat} className="size-24" />
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-stone-950">{cat.name}</h2>
              <p className="text-sm text-stone-600">{cat.shortIntro}</p>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-orange-50 text-stone-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-white/70 bg-white/80 py-6 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">本地状态</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <StatusRow label="模拟会员状态" value={userState.isMember ? "已开通会员" : "未开通会员"} />
            <StatusRow label="是否完成引导" value={userState.hasCompletedOnboarding ? "已完成" : "未完成"} />
            <StatusRow label="当前猫咪 ID" value={userState.selectedCatId ?? "未选择"} />
            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild className="rounded-xl bg-stone-900">
                <Link href="/cats">
                  <RotateCcw className="size-4" />
                  重新选择猫咪
                </Link>
              </Button>
              <Button variant="destructive" onClick={resetData} className="rounded-xl">
                <Trash2 className="size-4" />
                清除本地数据
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-3 text-sm">
      <span className="text-stone-500">{label}</span>
      <span className="font-medium text-stone-900">{value}</span>
    </div>
  );
}
