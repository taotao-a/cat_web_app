import type { UserState } from "@/types/user";

export const defaultUserState: UserState = {
  hasCompletedOnboarding: false,
  selectedCatId: undefined,
  isMember: false,
};
