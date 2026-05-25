import type { ReactNode } from "react";

export function SoftPage({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fff8ee_0%,#ffeef5_38%,#eef7ff_100%)] text-stone-900">
      {children}
    </main>
  );
}
