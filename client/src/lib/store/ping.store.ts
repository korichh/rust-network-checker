import { create } from "zustand";

interface IPingStore {
  isLoading: boolean;
  setIsLoading: (updater: (isLoading: boolean) => boolean) => void;
  loadingText: string;
  setLoadingText: (loadingText: string) => void;
  pingList: string[];
  setPingList: (pingList: string[]) => void;
}

export const usePingStore = create<IPingStore>((set) => ({
  isLoading: false,
  setIsLoading: (updater) => set((state) => ({ isLoading: updater(state.isLoading) })),
  loadingText: "",
  setLoadingText: (loadingText) => set({ loadingText }),
  pingList: [],
  setPingList: (pingList) => set({ pingList }),
}))