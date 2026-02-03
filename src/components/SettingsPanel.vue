<script setup lang="ts">
import { X, Moon, Sun, Monitor, Volume2, Zap, RotateCcw, Download, Keyboard } from 'lucide-vue-next';
import { useSettingsStore, type ThemeMode } from '../stores/settings';
import { useStatsStore } from '../stores/stats';
import { audioService } from '../composables/useAudio';

const settingsStore = useSettingsStore();
const statsStore = useStatsStore();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const themes: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor }
];

function selectTheme(theme: ThemeMode): void {
  audioService.playToggle();
  settingsStore.setTheme(theme);
  statsStore.recordThemeSwitch();
}

function toggleSound(): void {
  audioService.playClick();
  settingsStore.toggleSound();
}

function toggleAnimations(): void {
  audioService.playClick();
  settingsStore.toggleAnimations();
}

function close(): void {
  audioService.playClick();
  emit('close');
}

function exportData(): void {
  const data = {
    settings: settingsStore.exportSettings(),
    stats: statsStore.exportStats(),
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'docs-export.json';
  a.click();
  URL.revokeObjectURL(url);
  audioService.playToggle();
}

function resetAll(): void {
  if (confirm('Reset all settings and statistics?')) {
    settingsStore.resetSettings();
    statsStore.resetStats();
    audioService.playToggle();
  }
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>

    <div class="relative w-full max-w-lg bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-2xl overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-border dark:border-border-dark">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-xl bg-primary/10 text-primary">
            <Zap :size="20" />
          </div>
          <h2 class="text-lg font-bold text-text dark:text-text-dark">
            Settings
          </h2>
        </div>
        <button
          @click="close"
          class="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-surface-hover-dark text-text-muted dark:text-text-muted-dark transition-colors"
          aria-label="Close settings"
        >
          <X :size="20" />
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-8 max-h-[60vh] overflow-y-auto">
        <!-- Theme Selection -->
        <div class="space-y-4">
          <label class="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark">
            Theme
          </label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="theme in themes"
              :key="theme.value"
              @click="selectTheme(theme.value)"
              class="flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200"
              :class="settingsStore.theme === theme.value
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                : 'bg-surface dark:bg-surface-dark border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-primary/50'"
            >
              <component :is="theme.icon" :size="22" />
              <span class="text-xs font-semibold">{{ theme.label }}</span>
            </button>
          </div>
        </div>

        <!-- Preferences -->
        <div class="space-y-4">
          <label class="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark">
            Preferences
          </label>
          <div class="space-y-3">
            <!-- Sound Toggle -->
            <div class="flex items-center justify-between p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-primary/10 text-primary">
                  <Volume2 :size="18" />
                </div>
                <div>
                  <p class="font-semibold text-sm text-text dark:text-text-dark">Sound Effects</p>
                  <p class="text-xs text-text-muted dark:text-text-muted-dark">Enable audio feedback</p>
                </div>
              </div>
              <button
                @click="toggleSound"
                class="relative w-12 h-6 rounded-full transition-colors duration-200"
                :class="settingsStore.soundEnabled ? 'bg-primary' : 'bg-border dark:bg-border-dark'"
              >
                <span
                  class="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200"
                  :class="settingsStore.soundEnabled ? 'left-7' : 'left-1'"
                ></span>
              </button>
            </div>

            <!-- Animations Toggle -->
            <div class="flex items-center justify-between p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-violet/10 text-violet">
                  <Zap :size="18" />
                </div>
                <div>
                  <p class="font-semibold text-sm text-text dark:text-text-dark">Animations</p>
                  <p class="text-xs text-text-muted dark:text-text-muted-dark">Enable smooth transitions</p>
                </div>
              </div>
              <button
                @click="toggleAnimations"
                class="relative w-12 h-6 rounded-full transition-colors duration-200"
                :class="settingsStore.animationsEnabled ? 'bg-violet' : 'bg-border dark:bg-border-dark'"
              >
                <span
                  class="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200"
                  :class="settingsStore.animationsEnabled ? 'left-7' : 'left-1'"
                ></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="space-y-4">
          <label class="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark">
            Statistics
          </label>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
              <p class="text-2xl font-bold text-text dark:text-text-dark">{{ statsStore.statsSummary.totalVisits }}</p>
              <p class="text-xs font-medium text-text-muted dark:text-text-muted-dark uppercase tracking-wide">Visits</p>
            </div>
            <div class="p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
              <p class="text-2xl font-bold text-text dark:text-text-dark">{{ statsStore.statsSummary.totalClicks }}</p>
              <p class="text-xs font-medium text-text-muted dark:text-text-muted-dark uppercase tracking-wide">Interactions</p>
            </div>
            <div class="p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
              <p class="text-2xl font-bold text-text dark:text-text-dark">{{ statsStore.statsSummary.themeSwitches }}</p>
              <p class="text-xs font-medium text-text-muted dark:text-text-muted-dark uppercase tracking-wide">Theme Switches</p>
            </div>
            <div class="p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
              <p class="text-2xl font-bold text-text dark:text-text-dark">{{ statsStore.statsSummary.shortcutsUsed }}</p>
              <p class="text-xs font-medium text-text-muted dark:text-text-muted-dark uppercase tracking-wide">Shortcuts</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            @click="exportData"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark hover:bg-surface-hover dark:hover:bg-surface-hover-dark transition-colors"
          >
            <Download :size="16" />
            Export
          </button>
          <button
            @click="resetAll"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <RotateCcw :size="16" />
            Reset
          </button>
        </div>
      </div>

      <!-- Footer with Keyboard Shortcuts -->
      <div class="px-6 py-4 border-t border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
        <div class="flex items-center justify-center gap-2 text-xs text-text-muted dark:text-text-muted-dark">
          <Keyboard :size="14" />
          <span>Shortcuts:</span>
          <kbd class="px-2 py-0.5 text-xs font-mono bg-surface-hover dark:bg-surface-hover-dark border border-border dark:border-border-dark rounded">Ctrl+K</kbd>
          <span>Search</span>
          <kbd class="px-2 py-0.5 text-xs font-mono bg-surface-hover dark:bg-surface-hover-dark border border-border dark:border-border-dark rounded">Ctrl+S</kbd>
          <span>Settings</span>
        </div>
      </div>
    </div>
  </div>
</template>
