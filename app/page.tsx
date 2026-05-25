"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SoftPage } from "@/components/common/SoftPage";
import { getUserState } from "@/lib/storage";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const userState = getUserState();
    if (userState.hasCompletedOnboarding && userState.selectedCatId) {
      router.replace("/home");
      return;
    }
    router.replace("/onboarding");
  }, [router]);

  return (
    <SoftPage>
      <div className="flex min-h-screen items-center justify-center text-stone-600">正在准备你的陪伴猫咪...</div>
    </SoftPage>
  );
}
