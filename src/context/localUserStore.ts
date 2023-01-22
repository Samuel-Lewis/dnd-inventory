import { create } from "zustand";

import { UserRef } from "~/api/firebase/models/User";

interface UserStoreState {
  userRef?: UserRef;
  setUser: (userRef: UserStoreState["userRef"]) => void;
  clearUser: () => void;
}

export const useLocalUserStore = create<UserStoreState>((set) => ({
  userRef: undefined,
  setUser: (userRef) => set(() => ({ userRef })),
  clearUser: () => set({ userRef: undefined }),
}));
