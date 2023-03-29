/* global HTMLElement, customElements */

export class TabFocusChecker extends HTMLElement {
  #icon

  #focusListener = () => this.onFocus()
  #blurListener = () => this.onBlur()

  connectedCallback () {
    this.#icon = document.querySelector('[rel=icon]')
    window.addEventListener('blur', this.#blurListener)
    window.addEventListener('focus', this.#focusListener)
  }

  onBlur () {
    this.#icon?.setAttribute('href', '/images/favicon-inactive.svg')
  }

  onFocus () {
    this.#icon?.setAttribute('href', '/images/favicon.svg')
  }

  disconnectedCallback () {
    if (this.#blurListener) { window.removeEventListener('blur', this.#blurListener) }
    if (this.#focusListener) {
      this.#focusListener()
      window.removeEventListener('focus', this.#focusListener)
    }
  }
}

customElements.define('tab-focus-checker', TabFocusChecker)
