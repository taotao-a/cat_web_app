import type { MembershipBenefit, MembershipPlan } from "@/types/membership";

export const membershipBenefits: MembershipBenefit[] = [
  { id: "chat", title: "每日更多聊天次数", description: "让猫咪陪你聊更久，把零散情绪慢慢说完。" },
  { id: "stories", title: "解锁猫咪专属故事", description: "了解它更多过往、习惯和隐藏的小性格。" },
  { id: "bond", title: "解锁亲密度成长系统", description: "用每日陪伴累积你们之间的关系感。" },
  { id: "voice", title: "解锁更多猫咪语气包", description: "让陪伴回应更丰富，也更贴近你的偏好。" },
  { id: "night", title: "解锁晚安问候", description: "在睡前收到一段轻轻的陪伴和告别。" },
  { id: "diary", title: "解锁专属陪伴日记", description: "把聊天、心情和小任务整理成温柔记录。" },
  { id: "early", title: "优先体验新猫咪角色", description: "第一时间遇见更多不同风格的陪伴猫咪。" },
];

export const membershipPlans: MembershipPlan[] = [
  { id: "monthly", name: "月度会员", price: "¥18/月", highlight: "适合先体验完整陪伴" },
  { id: "yearly", name: "年度会员", price: "¥128/年", highlight: "更适合长期陪伴关系" },
  { id: "forever", name: "永久会员", price: "¥298", highlight: "一次解锁核心权益" },
];
