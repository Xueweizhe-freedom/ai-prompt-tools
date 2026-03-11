// Security utilities for anti-scraping and protection

// User-Agent detection for common bots
export function isBotUserAgent() {
  const userAgent = navigator.userAgent.toLowerCase()
  const botPatterns = [
    'bot',
    'crawler',
    'spider',
    'scraper',
    'curl',
    'wget',
    'python-requests',
    'scrapy',
    'headlesschrome',
    'phantomjs',
    'selenium',
    'puppeteer',
    'playwright'
  ]
  
  return botPatterns.some(pattern => userAgent.includes(pattern))
}

// Request rate limiting using localStorage
const RATE_LIMIT_KEY = 'requestTimestamps'
const MAX_REQUESTS_PER_MINUTE = 60

export function checkRateLimit() {
  const now = Date.now()
  const oneMinuteAgo = now - 60000
  
  // Get stored timestamps
  let timestamps = []
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY)
    if (stored) {
      timestamps = JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to parse rate limit data:', e)
  }
  
  // Filter to only include requests from the last minute
  timestamps = timestamps.filter(ts => ts > oneMinuteAgo)
  
  // Check if limit exceeded
  if (timestamps.length >= MAX_REQUESTS_PER_MINUTE) {
    return {
      allowed: false,
      retryAfter: Math.ceil((timestamps[0] + 60000 - now) / 1000)
    }
  }
  
  // Add current timestamp
  timestamps.push(now)
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps))
  
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_MINUTE - timestamps.length
  }
}

// Referrer check
export function isValidReferrer() {
  const referrer = document.referrer
  const currentHost = window.location.hostname
  
  // Allow empty referrer or same-origin
  if (!referrer) return true
  
  try {
    const referrerUrl = new URL(referrer)
    return referrerUrl.hostname === currentHost
  } catch {
    return false
  }
}

// Content protection - disable right click on sensitive content
export function protectContent(element) {
  if (!element) return
  
  element.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    return false
  })
  
  // Disable text selection
  element.style.userSelect = 'none'
  element.style.webkitUserSelect = 'none'
}

// Detect developer tools
export function detectDevTools(callback) {
  const threshold = 160
  let devToolsOpen = false
  
  const check = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold
    const heightThreshold = window.outerHeight - window.innerHeight > threshold
    
    if (widthThreshold || heightThreshold) {
      if (!devToolsOpen) {
        devToolsOpen = true
        callback(true)
      }
    } else {
      if (devToolsOpen) {
        devToolsOpen = false
        callback(false)
      }
    }
  }
  
  setInterval(check, 1000)
}

// Generate security headers meta tags
export function generateSecurityMeta() {
  const metaTags = [
    { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'" },
    { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
    { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
    { 'http-equiv': 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0' }
  ]
  
  metaTags.forEach(meta => {
    const tag = document.createElement('meta')
    Object.entries(meta).forEach(([key, value]) => {
      tag.setAttribute(key, value)
    })
    document.head.appendChild(tag)
  })
}
