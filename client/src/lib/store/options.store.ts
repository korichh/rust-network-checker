import { create } from "zustand";
import { GetOptionsResponse } from "../api/options";

interface IOptionsStore {
  options: GetOptionsResponse | null;
  setOptions: (options: GetOptionsResponse) => void;
}

export const useOptionsStore = create<IOptionsStore>((set) => ({
  options: null,
  setOptions: (options) => set({ options }),
}))