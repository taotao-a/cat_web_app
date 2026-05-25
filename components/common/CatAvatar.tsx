import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Cat } from "@/types/cat";
import { cn } from "@/lib/utils";

type CatAvatarProps = {
  cat: Cat;
  className?: string;
};

export function CatAvatar({ cat, className }: CatAvatarProps) {
  return (
    <Avatar className={cn("size-16 border-4 border-white shadow-md", className)}>
      <AvatarImage src={cat.avatar} alt={cat.name} />
      <AvatarFallback>{cat.name.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
}
