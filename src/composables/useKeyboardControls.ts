import { onMounted, onUnmounted } from 'vue';
import { KEYBOARD_SHORTCUTS } from '../utils/constants';

const isBrowser = typeof window !== 'undefined';

interface UseKeyboardControlsOptions {
  enabled?: boolean;
}

export function useKeyboardControls(
  handlers: {
    onToggleTheme?: () => void;
    onOpenSettings?: () => void;
    onOpenSearch?: () => void;
    onClose?: () => void;
  },
  options: UseKeyboardControlsOptions = {}
): void {
  const { enabled = true } = options;

  function handleKeydown(event: KeyboardEvent): void {
    if (!enabled) return;
    if (!(isBrowser && event.target instanceof HTMLBodyElement)) return;

    const keys = [];

    if (event.ctrlKey || event.metaKey) keys.push('ctrl');
    if (event.shiftKey) keys.push('shift');
    if (event.altKey) keys.push('alt');
    if (event.key.toLowerCase() !== 'control' && event.key.toLowerCase() !== 'shift' && event.key.toLowerCase() !== 'alt' && event.key.toLowerCase() !== 'meta') {
      keys.push(event.key.toLowerCase());
    }

    const keyCombo = keys.join('+');

    if (event.key === 'Escape') {
      event.preventDefault();
      handlers.onClose?.();
    }

    const themeShortcut = KEYBOARD_SHORTCUTS.TOGGLE_THEME.join('+');
    if (keyCombo === themeShortcut && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      handlers.onToggleTheme?.();
    }

    const settingsShortcut = KEYBOARD_SHORTCUTS.OPEN_SETTINGS.join('+');
    if (keyCombo === settingsShortcut && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
      event.preventDefault();
      handlers.onOpenSettings?.();
    }

    const searchShortcut = ['ctrl', 'k'].join('+');
    if (keyCombo === searchShortcut && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      handlers.onOpenSearch?.();
    }
  }

  onMounted(() => {
    if (isBrowser) {
      document.addEventListener('keydown', handleKeydown);
    }
  });

  onUnmounted(() => {
    if (isBrowser) {
      document.removeEventListener('keydown', handleKeydown);
    }
  });
}
