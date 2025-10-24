"use client";
import { create } from "zustand";
import type { Category, Scale, Aspect } from "@/types";
type State = {
  scaleFilter: Scale | "Alle";
  categoryFilter: Category | "Alle";
  aspect: Aspect;
  search: string;
};
type Actions = {
  setScaleFilter: (s: State["scaleFilter"]) => void;
  setCategoryFilter: (c: State["categoryFilter"]) => void;
  setAspect: (a: Aspect) => void;
  setSearch: (q: string) => void;
  reset: () => void;
};
export const useCatalogStore = create<State & Actions>((set) => ({
  scaleFilter: "Alle",
  categoryFilter: "Alle",
  aspect: "4:3",
  search: "",
  setScaleFilter: (s) => set({ scaleFilter: s }),
  setCategoryFilter: (c) => set({ categoryFilter: c }),
  setAspect: (a) => set({ aspect: a }),
  setSearch: (q) => set({ search: q }),
  reset: () =>
    set({
      scaleFilter: "Alle",
      categoryFilter: "Alle",
      aspect: "4:3",
      search: "",
    }),
}));
