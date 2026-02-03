import { getHighlighter, type Highlighter, type BundledLanguage, type BundledTheme } from 'shiki'
import { ref, onMounted } from 'vue'

const isBrowser = typeof window !== 'undefined'

let highlighterInstance: Highlighter | null = null
const isInitializing = ref(false)
const initPromise: Promise<Highlighter> | null = null

/**
 * Initialize Shiki highlighter with default themes
 */
async function getHighlighterInstance(): Promise<Highlighter> {
  if (highlighterInstance) {
    return highlighterInstance
  }

  if (initPromise) {
    return initPromise
  }

  initPromise = (async () => {
    if (isInitializing.value) {
      // Wait for existing initialization
      while (isInitializing.value) {
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      return highlighterInstance!
    }

    isInitializing.value = true

    try {
      highlighterInstance = await getHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: [
          'javascript',
          'typescript',
          'jsx',
          'tsx',
          'vue',
          'css',
          'html',
          'json',
          'markdown',
          'bash',
          'python',
          'rust',
          'go',
          'java',
          'c',
          'cpp',
          'csharp',
          'php',
          'ruby',
          'sql',
          'yaml',
          'xml'
        ]
      })

      return highlighterInstance
    } finally {
      isInitializing.value = false
    }
  })()

  return initPromise
}

/**
 * Highlight code with Shiki
 */
export async function highlightCode(
  code: string,
  lang: BundledLanguage = 'javascript',
  theme: BundledTheme = 'github-light'
): Promise<string> {
  try {
    const highlighter = await getHighlighterInstance()
    return highlighter.codeToHtml(code, {
      lang,
      theme
    })
  } catch (error) {
    console.error('Failed to highlight code:', error)
    // Fallback to escaped HTML
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
}

/**
 * Highlight code for both light and dark themes
 */
export async function highlightCodeDualTheme(
  code: string,
  lang: BundledLanguage = 'javascript'
): Promise<{ light: string; dark: string }> {
  try {
    const highlighter = await getHighlighterInstance()
    const light = highlighter.codeToHtml(code, {
      lang,
      theme: 'github-light'
    })
    const dark = highlighter.codeToHtml(code, {
      lang,
      theme: 'github-dark'
    })
    return { light, dark }
  } catch (error) {
    console.error('Failed to highlight code:', error)
    const fallback = escapeHtml(code)
    return {
      light: `<pre><code>${fallback}</code></pre>`,
      dark: `<pre><code>${fallback}</code></pre>`
    }
  }
}

/**
 * Escape HTML entities
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

/**
 * Composable for using Shiki in components
 */
export function useShiki() {
  const isReady = ref(false)
  const error = ref<Error | null>(null)

  onMounted(async () => {
    if (!isBrowser) return

    try {
      await getHighlighterInstance()
      isReady.value = true
    } catch (e) {
      error.value = e as Error
      console.error('Failed to initialize Shiki:', e)
    }
  })

  return {
    isReady,
    error,
    highlightCode,
    highlightCodeDualTheme
  }
}

/**
 * Get available languages
 */
export async function getSupportedLanguages(): Promise<string[]> {
  const highlighter = await getHighlighterInstance()
  return highlighter.getLoadedLanguages()
}

/**
 * Check if a language is supported
 */
export async function isLanguageSupported(lang: string): Promise<boolean> {
  const languages = await getSupportedLanguages()
  return languages.includes(lang)
}
