import { create } from 'zustand'

type Store = {
  isOpen: boolean
  toggle: () => void
}

export const useToggleStore = create<Store>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

