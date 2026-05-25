"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CatAvatar } from "@/components/common/CatAvatar";
import { CatCard } from "@/components/cat/CatCard";
import { cats } from "@/mock/cats";
import { completeOnboarding } from "@/lib/storage";

const introSlides = [
  {
    title: "福宝",
    subtitle: "温柔可靠的大哥哥猫咪",
    body:
      "福宝是一只绅士又成熟的猫咪。他不吵闹，也不会随便打断你，只会在你需要的时候安静地陪在身边。\n\n当你累了、难过了，或者只是想找人说说话，福宝都会认真听你讲完。他的陪伴像一盏温暖的小灯，不耀眼，却一直都在。",
    catId: "fubao",
    button: "下一位猫咪",
  },
  {
    title: "小布丁",
    subtitle: "阳光热情的元气弟弟猫咪",
    body:
      "小布丁是一只充满活力的小猫咪，像阳光一样明亮。他总是带着热情靠近你，喜欢分享开心的小事，也喜欢用轻松的话语逗你开心。\n\n如果你的生活有点无聊，或者今天的心情有些低落，小布丁会努力把快乐带到你身边，让普通的一天也变得轻快起来。",
    catId: "xiaobuding",
    button: "下一位猫咪",
  },
  {
    title: "茜茜",
    subtitle: "温柔细腻的知心姐姐猫咪",
    body:
      "茜茜是一只温柔又细腻的猫咪，带着一点小公主般的优雅。她很擅长察觉你的情绪，也愿意慢慢听你说那些不好意思告诉别人的心事。\n\n她不会急着评价你，也不会催你变好，而是先陪你一起感受当下。和茜茜聊天，就像和一位知心姐姐坐在窗边慢慢说话。",
    catId: "xixi",
    button: "下一位猫咪",
  },
  {
    title: "泡芙",
    subtitle: "傲娇元气的大小姐猫咪",
    body:
      "泡芙是一只金渐层猫咪，像个有点任性的大小姐。她表面傲娇，偶尔嘴硬，还会假装不在意你，但其实心里一直偷偷关心着你。\n\n她的陪伴方式有点俏皮，也有点反差萌。你会发现，她虽然总说“才不是担心你”，却总能在关键时刻给你最可爱的回应。",
    catId: "paofu",
    button: "去选择我的猫咪",
  },
];

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedCatId, setSelectedCatId] = useState<string>();
  const currentCat = useMemo(() => cats.find((cat) => cat.id === introSlides[step - 1]?.catId), [step]);
  const isSelectStep = step === 5;

  function nextStep() {
    setStep((current) => Math.min(current + 1, 5));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function confirmSelection() {
    if (!selectedCatId) return;
    completeOnboarding(selectedCatId);
    router.push("/home");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-stone-600">
          {Array.from({ length: 6 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setStep(index)}
              className={`h-2 rounded-full transition-all ${index === step ? "w-8 bg-orange-500" : "w-2 bg-white/80"}`}
              aria-label={`切换到第 ${index + 1} 页`}
            />
          ))}
        </div>
        <span className="text-sm text-stone-500">{step + 1} / 6</span>
      </div>

      <section className="grid flex-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        {step === 0 && (
          <>
            <div className="space-y-6">
              <Badge className="bg-orange-100 text-orange-700">AI 陪伴猫咪</Badge>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-5xl font-semibold leading-tight text-stone-950">遇见你的专属陪伴猫咪</h1>
                <p className="max-w-2xl text-lg leading-8 text-stone-600">
                  这里有 4 只性格完全不同的小猫，它们都有自己的故事、脾气和陪伴方式。选择一只最打动你的猫咪，让它成为每天陪你聊天、听你倾诉、给你回应的专属伙伴。
                </p>
              </div>
              <Button onClick={nextStep} className="h-11 rounded-xl bg-stone-900 px-5">
                认识它们
                <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {cats.map((cat) => (
                <Card key={cat.id} className="rounded-2xl border-white/70 bg-white/70 py-5 shadow-sm backdrop-blur">
                  <CardContent className="flex items-center gap-4">
                    <CatAvatar cat={cat} />
                    <div>
                      <p className="font-semibold text-stone-950">{cat.name}</p>
                      <p className="text-sm text-stone-500">{cat.roleType}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {currentCat && !isSelectStep && (
          <>
            <div className="space-y-6">
              <Badge className="bg-white/80 text-stone-700">{currentCat.chatStyle}</Badge>
              <div className="space-y-3">
                <h1 className="text-5xl font-semibold text-stone-950">{currentCat.name}</h1>
                <p className="text-xl text-orange-700">{introSlides[step - 1].subtitle}</p>
              </div>
              <div className="max-w-2xl whitespace-pre-line text-lg leading-9 text-stone-600">{introSlides[step - 1].body}</div>
              <div className="flex flex-wrap gap-2">
                {currentCat.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/85 text-stone-700">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button onClick={nextStep} className="h-11 rounded-xl bg-stone-900 px-5">
                {introSlides[step - 1].button}
                <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-5 rounded-[2rem] bg-white/50 blur-2xl" />
                <Image
                  src={currentCat.avatar}
                  alt={currentCat.name}
                  width={390}
                  height={460}
                  className="relative h-[460px] w-[390px] rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/80"
                />
              </div>
            </div>
          </>
        )}

        {isSelectStep && (
          <div className="lg:col-span-2">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div className="space-y-3">
                <Badge className="bg-orange-100 text-orange-700">
                  <Heart className="size-3" />
                  初次选择
                </Badge>
                <h1 className="text-4xl font-semibold text-stone-950">选择你的第一只陪伴猫咪</h1>
                <p className="max-w-3xl text-base leading-7 text-stone-600">
                  每只猫咪都有不同的性格和陪伴方式。请选择最让你心动的一只，它会成为接下来陪你聊天、听你倾诉、记录心情的专属伙伴。
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {cats.map((cat) => (
                <CatCard key={cat.id} cat={cat} selected={selectedCatId === cat.id} onClick={() => setSelectedCatId(cat.id)} />
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                onClick={confirmSelection}
                disabled={!selectedCatId}
                className="h-11 rounded-xl bg-stone-900 px-5 disabled:bg-stone-400"
              >
                {selectedCatId ? "确认选择，开始陪伴" : "请先选择一只猫咪"}
              </Button>
            </div>
          </div>
        )}
      </section>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={previousStep} disabled={step === 0} className="rounded-xl bg-white/70">
          <ArrowLeft className="size-4" />
          上一页
        </Button>
        <Button variant="ghost" onClick={nextStep} disabled={step === 5} className="rounded-xl">
          下一页
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
