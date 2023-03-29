/* global HTMLLIElement, customElements, CustomEvent */

export class ComboBoxListItem extends HTMLLIElement {
  #text
  #value
  #handleClick = (e) => this.handleClick(e)
  constructor () {
    super()
    this.setAttribute('is', 'combo-box-list-item')
    console.log('ITEM CREATED')
  }

  connectedCallback () {
    console.log('ITEM CONNECTED')
    this.addEventListener('click', this.#handleClick)
  }

  handleClick (e) {
    e.preventDefault()
    this.dispatchEvent(new CustomEvent('combo-item:select', { detail: { text: this.text, value: this.value }, bubbles: true }))
  }

  set text (text) {
    this.#text = text
    this.innerText = this.#text
  }

  get text () {
    return this.#text
  }

  set value (value) {
    this.#value = value
  }

  get value () {
    return this.#value
  }

  static build (result) {
    const item = document.createElement('li', { is: 'combo-box-list-item' })
    item.text = result.text
    item.value = result.value
    return item
  }
}

customElements.define('combo-box-list-item', ComboBoxListItem, { extends: 'li' })
