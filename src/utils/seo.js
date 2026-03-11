// SEO utilities

export function generateMetaTags({
  title,
  description,
  image = '/og-image.png',
  url = window.location.href,
  type = 'website'
}) {
  const siteName = 'AI Prompt Hub'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  
  // Update title
  document.title = fullTitle
  
  // Helper to create or update meta tag
  const setMeta = (name, content, property = false) => {
    let meta = document.querySelector(property ? `meta[property="${name}"]` : `meta[name="${name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute(property ? 'property' : 'name', name)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  }
  
  // Standard meta tags
  setMeta('description', description)
  setMeta('keywords', 'AI prompts, ChatGPT prompts, AI writing, AI art, prompt engineering, AI tools')
  setMeta('author', 'AI Prompt Hub')
  setMeta('robots', 'index, follow')
  
  // Open Graph tags
  setMeta('og:title', fullTitle, true)
  setMeta('og:description', description, true)
  setMeta('og:type', type, true)
  setMeta('og:url', url, true)
  setMeta('og:image', new URL(image, window.location.origin).href, true)
  setMeta('og:site_name', siteName, true)
  setMeta('og:locale', document.documentElement.lang === 'zh' ? 'zh_CN' : 'en_US', true)
  
  // Twitter Card tags
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', fullTitle)
  setMeta('twitter:description', description)
  setMeta('twitter:image', new URL(image, window.location.origin).href)
  
  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)
}

// Generate structured data (JSON-LD)
export function generateStructuredData(data) {
  const scriptId = 'structured-data'
  let script = document.getElementById(scriptId)
  
  if (!script) {
    script = document.createElement('script')
    script.id = scriptId
    script.setAttribute('type', 'application/ld+json')
    document.head.appendChild(script)
  }
  
  const baseData = {
    '@context': 'https://schema.org',
    ...data
  }
  
  script.textContent = JSON.stringify(baseData, null, 2)
}

// Generate website structured data
export function generateWebsiteStructuredData() {
  generateStructuredData({
    '@type': 'WebSite',
    name: 'AI Prompt Hub',
    url: window.location.origin,
    description: '专业的 AI 提示词资源平台，收录各行业优质 AI 提示词',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${window.location.origin}/prompts?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  })
}

// Generate prompt structured data
export function generatePromptStructuredData(prompt) {
  generateStructuredData({
    '@type': 'Article',
    headline: prompt.title,
    description: prompt.description,
    author: {
      '@type': 'Organization',
      name: 'AI Prompt Hub'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Prompt Hub',
      logo: {
        '@type': 'ImageObject',
        url: `${window.location.origin}/logo.png`
      }
    },
    datePublished: prompt.createdAt || new Date().toISOString(),
    dateModified: prompt.updatedAt || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${window.location.origin}/prompt/${prompt.id}`
    },
    keywords: prompt.tags?.join(', ') || '',
    articleSection: prompt.categoryName
  })
}
