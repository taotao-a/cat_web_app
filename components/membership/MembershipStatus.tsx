"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserState, saveUserState } from "@/lib/storage";

export function MembershipStatus() {
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsMember(getUserState().isMember);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  function openMember() {
    saveUserState({ isMember: true });
    setIsMember(true);
  }

  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50/80 p-5">
      <div className="mb-4 flex items-center gap-2 font-semibold text-stone-950">
        {isMember ? <CheckCircle2 className="size-5 text-emerald-600" /> : <Sparkles className="size-5 text-orange-600" />}
        {isMember ? "已开通会员" : "当前为普通体验"}
      </div>
      <Button onClick={openMember} disabled={isMember} className="h-10 rounded-xl bg-stone-900">
        {isMember ? "会员陪伴已解锁" : "模拟开通会员"}
      </Button>
    </div>
  );
}
