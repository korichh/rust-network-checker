import { create } from "zustand";
import { IPingItem } from "../utils";

interface IPingStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  loadingText: string;
  setLoadingText: (loadingText: string) => void;
  pingList: IPingItem[];
  setPingList: (pingList: IPingItem[]) => void;
  time: number;
  setTime: (arg: number | ((prev: number) => number)) => void;
  refreshAllowed: boolean;
  setRefreshAllowed: (refreshAllowed: boolean) => void;
}

export const usePingStore = create<IPingStore>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  loadingText: "",
  setLoadingText: (loadingText) => set({ loadingText }),
  pingList: [],
  setPingList: (pingList) => set({ pingList }),
  time: 0,
  setTime: (arg) => set((state) => ({ time: typeof arg === "number" ? arg : arg(state.time) })),
  refreshAllowed: false,
  setRefreshAllowed: (refreshAllowed) => set({ refreshAllowed }),
}))