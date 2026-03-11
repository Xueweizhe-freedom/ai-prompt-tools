import { ref } from 'vue'

export function useCopy() {
  const copied = ref(false)
  const copyError = ref(null)
  
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Use modern Clipboard API
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        
        if (!successful) {
          throw new Error('execCommand failed')
        }
      }
      
      copied.value = true
      copyError.value = null
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        copied.value = false
      }, 2000)
      
      return true
    } catch (err) {
      copied.value = false
      copyError.value = err.message
      console.error('Failed to copy:', err)
      return false
    }
  }
  
  return {
    copied,
    copyError,
    copyToClipboard
  }
}
