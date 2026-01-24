import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { STORAGE_KEYS } from '../utils/constants';

const isBrowser = typeof window !== 'undefined';

export type ThemeMode = 'light' | 'dark' | 'system';

interface SettingsState {
  theme: ThemeMode;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  reducedMotion: boolean;
  showHelp: boolean;
}

const DEFAULT_SETTINGS: SettingsState = {
  theme: 'system',
  soundEnabled: true,
  animationsEnabled: true,
  reducedMotion: false,
  showHelp: false
};

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<ThemeMode>(DEFAULT_SETTINGS.theme);
  const soundEnabled = ref(DEFAULT_SETTINGS.soundEnabled);
  const animationsEnabled = ref(DEFAULT_SETTINGS.animationsEnabled);
  const reducedMotion = ref(DEFAULT_SETTINGS.reducedMotion);
  const showHelp = ref(DEFAULT_SETTINGS.showHelp);

  const isDarkMode = computed(() => {
    if (theme.value === 'system' && isBrowser) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme.value === 'dark';
  });

  const themeLabel = computed(() => {
    return theme.value.charAt(0).toUpperCase() + theme.value.slice(1);
  });

  function loadSettings(): void {
    if (!isBrowser) return;
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        theme.value = parsed.theme ?? DEFAULT_SETTINGS.theme;
        soundEnabled.value = parsed.soundEnabled ?? DEFAULT_SETTINGS.soundEnabled;
        animationsEnabled.value = parsed.animationsEnabled ?? DEFAULT_SETTINGS.animationsEnabled;
        reducedMotion.value = parsed.reducedMotion ?? DEFAULT_SETTINGS.reducedMotion;
        showHelp.value = parsed.showHelp ?? DEFAULT_SETTINGS.showHelp;
      } catch {
        resetSettings();
      }
    }
    updateColorScheme();
  }

  function setTheme(newTheme: ThemeMode): void {
    theme.value = newTheme;
    updateColorScheme();
  }

  function toggleTheme(): void {
    const themeOrder: Record<ThemeMode, ThemeMode> = {
      light: 'dark',
      dark: 'system',
      system: 'light'
    };
    setTheme(themeOrder[theme.value]);
  }

  function setSoundEnabled(enabled: boolean): void {
    soundEnabled.value = enabled;
  }

  function toggleSound(): void {
    soundEnabled.value = !soundEnabled.value;
  }

  function setAnimationsEnabled(enabled: boolean): void {
    animationsEnabled.value = enabled;
    if (!enabled && isBrowser) {
      document.documentElement.classList.add('reduce-motion');
    } else if (isBrowser) {
      document.documentElement.classList.remove('reduce-motion');
    }
  }

  function toggleAnimations(): void {
    setAnimationsEnabled(!animationsEnabled.value);
  }

  function toggleHelp(): void {
    showHelp.value = !showHelp.value;
  }

  function hideHelp(): void {
    showHelp.value = false;
  }

  function updateColorScheme(): void {
    if (!isBrowser) return;
    document.documentElement.classList.toggle('dark', isDarkMode.value);
    document.documentElement.classList.toggle('light', !isDarkMode.value);
    if (reducedMotion.value) {
      document.documentElement.classList.add('reduce-motion');
    }
  }

  function exportSettings(): string {
    return JSON.stringify({
      theme: theme.value,
      soundEnabled: soundEnabled.value,
      animationsEnabled: animationsEnabled.value,
      reducedMotion: reducedMotion.value,
      showHelp: showHelp.value
    }, null, 2);
  }

  function resetSettings(): void {
    theme.value = DEFAULT_SETTINGS.theme;
    soundEnabled.value = DEFAULT_SETTINGS.soundEnabled;
    animationsEnabled.value = DEFAULT_SETTINGS.animationsEnabled;
    reducedMotion.value = DEFAULT_SETTINGS.reducedMotion;
    showHelp.value = DEFAULT_SETTINGS.showHelp;
    updateColorScheme();
  }

  watch([theme, soundEnabled, animationsEnabled, reducedMotion, showHelp], () => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      theme: theme.value,
      soundEnabled: soundEnabled.value,
      animationsEnabled: animationsEnabled.value,
      reducedMotion: reducedMotion.value,
      showHelp: showHelp.value
    }));
  });

  return {
    theme,
    soundEnabled,
    animationsEnabled,
    reducedMotion,
    showHelp,
    isDarkMode,
    themeLabel,
    loadSettings,
    setTheme,
    toggleTheme,
    setSoundEnabled,
    toggleSound,
    setAnimationsEnabled,
    toggleAnimations,
    toggleHelp,
    hideHelp,
    updateColorScheme,
    exportSettings,
    resetSettings
  };
});
