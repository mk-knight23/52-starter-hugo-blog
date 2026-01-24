import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { STORAGE_KEYS } from '../utils/constants';

const isBrowser = typeof window !== 'undefined';

export interface StatsState {
  visits: number;
  lastVisit: string;
  totalClicks: number;
  themeSwitches: number;
  settingsOpened: number;
  keyboardShortcutsUsed: number;
}

const INITIAL_STATS: StatsState = {
  visits: 0,
  lastVisit: '',
  totalClicks: 0,
  themeSwitches: 0,
  settingsOpened: 0,
  keyboardShortcutsUsed: 0
};

export const useStatsStore = defineStore('stats', () => {
  const visits = ref(INITIAL_STATS.visits);
  const lastVisit = ref(INITIAL_STATS.lastVisit);
  const totalClicks = ref(INITIAL_STATS.totalClicks);
  const themeSwitches = ref(INITIAL_STATS.themeSwitches);
  const settingsOpened = ref(INITIAL_STATS.settingsOpened);
  const keyboardShortcutsUsed = ref(INITIAL_STATS.keyboardShortcutsUsed);

  const statsSummary = computed(() => ({
    totalVisits: visits.value,
    totalClicks: totalClicks.value,
    themeSwitches: themeSwitches.value,
    shortcutsUsed: keyboardShortcutsUsed.value
  }));

  function loadStats(): void {
    if (!isBrowser) return;
    const stored = localStorage.getItem(STORAGE_KEYS.STATS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        visits.value = parsed.visits ?? INITIAL_STATS.visits;
        lastVisit.value = parsed.lastVisit ?? INITIAL_STATS.lastVisit;
        totalClicks.value = parsed.totalClicks ?? INITIAL_STATS.totalClicks;
        themeSwitches.value = parsed.themeSwitches ?? INITIAL_STATS.themeSwitches;
        settingsOpened.value = parsed.settingsOpened ?? INITIAL_STATS.settingsOpened;
        keyboardShortcutsUsed.value = parsed.keyboardShortcutsUsed ?? INITIAL_STATS.keyboardShortcutsUsed;
      } catch {
        resetStats();
      }
    }
  }

  function recordVisit(): void {
    const now = new Date().toISOString();
    visits.value += 1;
    lastVisit.value = now;
  }

  function recordClick(): void {
    totalClicks.value += 1;
  }

  function recordThemeSwitch(): void {
    themeSwitches.value += 1;
  }

  function recordSettingsOpen(): void {
    settingsOpened.value += 1;
  }

  function recordKeyboardShortcut(): void {
    keyboardShortcutsUsed.value += 1;
  }

  function exportStats(): string {
    return JSON.stringify({
      visits: visits.value,
      lastVisit: lastVisit.value,
      totalClicks: totalClicks.value,
      themeSwitches: themeSwitches.value,
      settingsOpened: settingsOpened.value,
      keyboardShortcutsUsed: keyboardShortcutsUsed.value
    }, null, 2);
  }

  function resetStats(): void {
    visits.value = INITIAL_STATS.visits;
    lastVisit.value = INITIAL_STATS.lastVisit;
    totalClicks.value = INITIAL_STATS.totalClicks;
    themeSwitches.value = INITIAL_STATS.themeSwitches;
    settingsOpened.value = INITIAL_STATS.settingsOpened;
    keyboardShortcutsUsed.value = INITIAL_STATS.keyboardShortcutsUsed;
  }

  watch([visits, lastVisit, totalClicks, themeSwitches, settingsOpened, keyboardShortcutsUsed], () => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify({
      visits: visits.value,
      lastVisit: lastVisit.value,
      totalClicks: totalClicks.value,
      themeSwitches: themeSwitches.value,
      settingsOpened: settingsOpened.value,
      keyboardShortcutsUsed: keyboardShortcutsUsed.value
    }));
  });

  return {
    visits,
    lastVisit,
    totalClicks,
    themeSwitches,
    settingsOpened,
    keyboardShortcutsUsed,
    statsSummary,
    loadStats,
    recordVisit,
    recordClick,
    recordThemeSwitch,
    recordSettingsOpen,
    recordKeyboardShortcut,
    exportStats,
    resetStats
  };
});
