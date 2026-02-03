// Comments configuration
// Choose either 'giscus' or 'utterances'
export const COMMENTS_PROVIDER: 'giscus' | 'utterances' | 'none' = 'none'

// Giscus configuration (https://giscus.app)
export const GISCUS_CONFIG = {
  repo: '', // e.g., 'your-username/your-repo'
  repoId: '', // From Giscus setup
  category: 'General',
  categoryId: '', // From Giscus setup
  mapping: 'pathname', // 'pathname', 'url', 'title', 'og:title', 'specific'
  strict: '0',
  reactionsEnabled: true,
  emitMetadata: false,
  inputPosition: 'bottom' as const, // 'top' or 'bottom'
  lang: 'en',
  lazy: true
}

// Utterances configuration (https://utteranc.es)
export const UTTERANCES_CONFIG = {
  repo: '', // e.g., 'your-username/your-repo'
  issueTerm: 'pathname', // 'pathname', 'url', 'title', 'og:title', 'specific'
  label: 'comments',
  theme: 'github-light' // Theme will be auto-switched
}
