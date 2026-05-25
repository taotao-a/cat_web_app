import { Crown, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { membershipBenefits, membershipPlans } from "@/mock/membership";
import { MembershipStatus } from "@/components/membership/MembershipStatus";

export default function MembershipPage() {
  return (
    <AppShell>
      <section className="mb-8 rounded-2xl border border-white/70 bg-white/75 p-8 shadow-sm backdrop-blur">
        <Badge className="mb-4 bg-amber-100 text-amber-700">
          <Crown className="size-3" />
          会员陪伴计划
        </Badge>
        <h1 className="text-4xl font-semibold text-stone-950">会员陪伴计划</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-stone-600">
          解锁更完整的猫咪陪伴体验，让你的专属猫咪更懂你。
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4 md:grid-cols-2">
          {membershipBenefits.map((benefit) => (
            <Card key={benefit.id} className="rounded-2xl border-white/70 bg-white/75 py-5 shadow-sm backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="size-4 text-orange-600" />
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-stone-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <aside className="space-y-4">
          <MembershipStatus />
          {membershipPlans.map((plan) => (
            <Card key={plan.id} className="rounded-2xl border-white/70 bg-white/80 py-5 shadow-sm backdrop-blur">
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-semibold text-stone-950">{plan.name}</h2>
                  <span className="text-lg font-semibold text-orange-700">{plan.price}</span>
                </div>
                <p className="text-sm text-stone-600">{plan.highlight}</p>
              </CardContent>
            </Card>
          ))}
        </aside>
      </div>
    </AppShell>
  );
}
