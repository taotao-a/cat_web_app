"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CatAvatar } from "@/components/common/CatAvatar";
import type { Cat } from "@/types/cat";
import { cn } from "@/lib/utils";

type CatCardProps = {
  cat: Cat;
  selected?: boolean;
  active?: boolean;
  onClick?: () => void;
};

export function CatCard({ cat, selected, active, onClick }: CatCardProps) {
  return (
    <button type="button" onClick={onClick} className="text-left">
      <Card
        className={cn(
          "h-full rounded-2xl border border-white/70 bg-white/75 py-5 shadow-sm ring-stone-200/70 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md",
          (selected || active) && "border-orange-300 bg-orange-50/80 ring-2 ring-orange-200"
        )}
      >
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <CatAvatar cat={cat} className="size-20" />
            {(selected || active) && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-medium text-white">
                <Check className="size-3" />
                {active ? "当前陪伴" : "已选择"}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-stone-950">{cat.name}</h3>
            <p className="mt-1 text-sm text-stone-600">{cat.shortIntro}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/80 text-stone-700">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
