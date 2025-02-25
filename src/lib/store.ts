
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth Store
interface AuthState {
  token: string | null;
  user: any | null;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Dark Mode Store
interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set) => ({
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
    }),
    {
      name: 'darkmode-storage',
    }
  )
);

// Dev Tools Store
interface DevToolsState {
  isMockingEnabled: boolean;
  apiDelay: number;
  setMockingEnabled: (enabled: boolean) => void;
  setApiDelay: (delay: number) => void;
}

export const useDevToolsStore = create<DevToolsState>((set) => ({
  isMockingEnabled: process.env.NODE_ENV === 'development',
  apiDelay: 0,
  setMockingEnabled: (enabled) => set({ isMockingEnabled: enabled }),
  setApiDelay: (delay) => set({ apiDelay: delay }),
}));
