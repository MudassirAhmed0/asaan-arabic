import { create } from 'zustand';

interface PreferencesState {
  soundEnabled: boolean;
  hapticsEnabled: boolean;

  setPreferences: (prefs: Partial<Omit<PreferencesState, 'setPreferences'>>) => void;
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
  soundEnabled: true,
  hapticsEnabled: true,

  setPreferences: (prefs) => set(prefs),
}));
