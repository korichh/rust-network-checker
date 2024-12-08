import { create } from "zustand";

interface IPingStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  loadingText: string;
  setLoadingText: (loadingText: string) => void;
  pingList: string[];
  setPingList: (pingList: string[]) => void;
}

export const usePingStore = create<IPingStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  loadingText: "",
  setLoadingText: (loadingText) => set({ loadingText }),
  pingList: [],
  setPingList: (pingList) => set({ pingList }),
}))