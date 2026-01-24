<script setup lang="ts">
import { X, Moon, Sun, Monitor, Volume2, Zap, RotateCcw, Download } from 'lucide-vue-next';
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
  a.download = 'hugo-blog-export.json';
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
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>

    <div
      class="relative w-full max-w-lg bg-neo-dark border-4 border-black rounded-3xl shadow-neo overflow-hidden"
    >
      <div class="flex items-center justify-between px-8 py-6 border-b-4 border-black">
        <h2 class="text-xl font-display font-black uppercase tracking-tight text-white">
          Settings
        </h2>
        <button
          @click="close"
          class="p-2 rounded-xl bg-neo-accent text-white hover:bg-neo-primary transition-colors"
          aria-label="Close settings"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto bg-neo-light">
        <div class="space-y-4">
          <label class="text-xs font-black uppercase tracking-widest text-neo-muted">
            Theme
          </label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="theme in themes"
              :key="theme.value"
              @click="selectTheme(theme.value)"
              class="flex flex-col items-center gap-3 p-4 rounded-2xl border-4 border-black transition-all hover:translate-y-[-2px]"
              :class="settingsStore.theme === theme.value
                ? 'bg-neo-accent text-white'
                : 'bg-white hover:bg-neo-accent/10'"
            >
              <component :is="theme.icon" :size="24" />
              <span class="text-xs font-black uppercase tracking-wide">{{ theme.label }}</span>
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <label class="text-xs font-black uppercase tracking-widest text-neo-muted">
            Preferences
          </label>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-4 rounded-2xl border-4 border-black bg-white">
              <div class="flex items-center gap-4">
                <div class="p-2 rounded-xl bg-neo-accent text-white">
                  <Volume2 :size="20" />
                </div>
                <div>
                  <p class="font-bold text-sm uppercase tracking-wide text-neo-dark">Sound Effects</p>
                  <p class="text-xs text-neo-muted">Enable audio feedback</p>
                </div>
              </div>
              <button
                @click="toggleSound"
                class="w-14 h-7 rounded-full border-4 border-black transition-colors"
                :class="settingsStore.soundEnabled ? 'bg-neo-accent' : 'bg-neo-muted'"
              >
                <span
                  class="block w-5 h-5 rounded-full bg-white border-2 border-black transition-transform"
                  :class="settingsStore.soundEnabled ? 'translate-x-7' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between p-4 rounded-2xl border-4 border-black bg-white">
              <div class="flex items-center gap-4">
                <div class="p-2 rounded-xl bg-neo-accent text-white">
                  <Zap :size="20" />
                </div>
                <div>
                  <p class="font-bold text-sm uppercase tracking-wide text-neo-dark">Animations</p>
                  <p class="text-xs text-neo-muted">Enable transitions</p>
                </div>
              </div>
              <button
                @click="toggleAnimations"
                class="w-14 h-7 rounded-full border-4 border-black transition-colors"
                :class="settingsStore.animationsEnabled ? 'bg-neo-accent' : 'bg-neo-muted'"
              >
                <span
                  class="block w-5 h-5 rounded-full bg-white border-2 border-black transition-transform"
                  :class="settingsStore.animationsEnabled ? 'translate-x-7' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <label class="text-xs font-black uppercase tracking-widest text-neo-muted">
            Statistics
          </label>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-4 rounded-2xl border-4 border-black bg-white">
              <p class="text-2xl font-black uppercase tracking-tight text-neo-dark">{{ statsStore.statsSummary.totalVisits }}</p>
              <p class="text-[10px] font-black uppercase tracking-widest text-neo-muted">Visits</p>
            </div>
            <div class="p-4 rounded-2xl border-4 border-black bg-white">
              <p class="text-2xl font-black uppercase tracking-tight text-neo-dark">{{ statsStore.statsSummary.totalClicks }}</p>
              <p class="text-[10px] font-black uppercase tracking-widest text-neo-muted">Clicks</p>
            </div>
            <div class="p-4 rounded-2xl border-4 border-black bg-white">
              <p class="text-2xl font-black uppercase tracking-tight text-neo-dark">{{ statsStore.statsSummary.themeSwitches }}</p>
              <p class="text-[10px] font-black uppercase tracking-widest text-neo-muted">Theme Switches</p>
            </div>
            <div class="p-4 rounded-2xl border-4 border-black bg-white">
              <p class="text-2xl font-black uppercase tracking-tight text-neo-dark">{{ statsStore.statsSummary.shortcutsUsed }}</p>
              <p class="text-[10px] font-black uppercase tracking-widest text-neo-muted">Shortcuts</p>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="exportData"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border-4 border-black hover:bg-neo-accent hover:text-white transition-all bg-white"
          >
            <Download :size="16" />
            Export
          </button>
          <button
            @click="resetAll"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border-4 border-black hover:bg-red-500 hover:text-white transition-all bg-white"
          >
            <RotateCcw :size="16" />
            Reset
          </button>
        </div>
      </div>

      <div class="px-8 py-4 border-t-4 border-black bg-neo-dark text-center">
        <p class="text-[10px] font-black uppercase tracking-widest text-neo-muted">
          Keyboard Shortcuts: <kbd class="mx-1 px-2 py-0.5 text-xs font-mono bg-white border-2 border-black rounded">Ctrl+K</kbd> Theme <kbd class="mx-1 px-2 py-0.5 text-xs font-mono bg-white border-2 border-black rounded">Ctrl+S</kbd> Settings <kbd class="mx-1 px-2 py-0.5 text-xs font-mono bg-white border-2 border-black rounded">Esc</kbd> Close
        </p>
      </div>
    </div>
  </div>
</template>
