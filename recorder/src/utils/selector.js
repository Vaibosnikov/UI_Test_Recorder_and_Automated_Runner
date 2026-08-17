// TestCraft Recorder - Selector Utility

export class SelectorUtils {
  /**
   * Generate a unique CSS selector for an element
   * @param {HTMLElement} element - Target element
   * @returns {string} CSS selector
   */
  static generateSelector(element) {
    // Prefer ID if available
    if (element.id) {
      return '#' + element.id;
    }

    // Try class names
    if (element.className && typeof element.className === 'string') {
      const classes = element.className.split(' ').filter(c => c.trim());
      if (classes.length > 0) {
        return element.tagName.toLowerCase() + '.' + classes.join('.');
      }
    }

    // Fallback to tag name
    return element.tagName.toLowerCase();
  }

  /**
   * Find element by selector
   * @param {string} selector - CSS selector
   * @returns {HTMLElement|null} Element or null
   */
  static findElement(selector) {
    try {
      return document.querySelector(selector);
    } catch (e) {
      console.error('Invalid selector:', selector, e);
      return null;
    }
  }

  /**
   * Check if element is visible and interactable
   * @param {HTMLElement} element - Target element
   * @returns {boolean} True if visible
   */
  static isElementVisible(element) {
    if (!element) return false;
    
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0';
  }
}

export default SelectorUtils;
