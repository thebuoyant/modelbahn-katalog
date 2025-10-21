
'use client';
import { create } from 'zustand';
import type { Category, Scale } from '@/types';

type State = {
  scaleFilter: Scale | 'Alle';
  categoryFilter: Category | 'Alle';
  search: string;
};

type Actions = {
  setScaleFilter: (s: State['scaleFilter']) => void;
  setCategoryFilter: (c: State['categoryFilter']) => void;
  setSearch: (q: string) => void;
  reset: () => void;
};

export const useCatalogStore = create<State & Actions>((set) => ({
  scaleFilter: 'Alle',
  categoryFilter: 'Alle',
  search: '',
  setScaleFilter: (s) => set({ scaleFilter: s }),
  setCategoryFilter: (c) => set({ categoryFilter: c }),
  setSearch: (q) => set({ search: q }),
  reset: () => set({ scaleFilter: 'Alle', categoryFilter: 'Alle', search: '' })
}));
