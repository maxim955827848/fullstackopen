import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Force overwrite jsdom's unimplemented stub for requestSubmit
if (typeof HTMLFormElement !== 'undefined') {
  HTMLFormElement.prototype.requestSubmit = function() {
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    this.dispatchEvent(submitEvent)
  }
}

afterEach(() => {
  cleanup()
})