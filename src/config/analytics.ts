// Analytics configuration
// Choose your analytics provider: 'google-analytics', 'plausible', or 'none'
export const ANALYTICS_PROVIDER: 'google-analytics' | 'plausible' | 'none' = 'none'

// Google Analytics configuration
export const GOOGLE_ANALYTICS_CONFIG = {
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '', // G-XXXXXXXXXX
  debug: import.meta.env.DEV || false
}

// Plausible Analytics configuration
export const PLAUSIBLE_CONFIG = {
  domain: import.meta.env.VITE_PLAUSIBLE_DOMAIN || '', // Your domain
  apiHost: import.meta.env.VITE_PLAUSIBLE_API_HOST || 'https://plausible.io'
}

// Initialize analytics
export function initAnalytics() {
  if (typeof window === 'undefined') return

  if (ANALYTICS_PROVIDER === 'google-analytics') {
    initGoogleAnalytics()
  } else if (ANALYTICS_PROVIDER === 'plausible') {
    initPlausible()
  }
}

// Google Analytics setup
function initGoogleAnalytics() {
  const { measurementId } = GOOGLE_ANALYTICS_CONFIG

  if (!measurementId) {
    console.warn('Google Analytics measurement ID not configured')
    return
  }

  // Load Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize gtag
  const configScript = document.createElement('script')
  configScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}'${GOOGLE_ANALYTICS_CONFIG.debug ? ", { 'debug_mode': true }" : ''});
  `
  document.head.appendChild(configScript)
}

// Plausible Analytics setup
function initPlausible() {
  const { domain, apiHost } = PLAUSIBLE_CONFIG

  if (!domain) {
    console.warn('Plausible domain not configured')
    return
  }

  // Load Plausible script
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.dataset.domain = domain
  script.src = `${apiHost}/js/script.js`
  document.head.appendChild(script)
}

// Track page views
export function trackPageView(path: string, title?: string) {
  if (ANALYTICS_PROVIDER === 'google-analytics' && typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_path: path,
      page_title: title
    })
  }
  // Plausible automatically tracks page views
}

// Track events
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (ANALYTICS_PROVIDER === 'google-analytics' && typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters)
  } else if (ANALYTICS_PROVIDER === 'plausible' && typeof window !== 'undefined') {
    (window as any).plausible?.(eventName, { props: parameters })
  }
}

// Declare gtag on window interface
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void
  }
}
