/* global HTMLElement, customElements */

class ComboBoxSearch extends HTMLElement {
  connectedCallback () {
    console.log('ComboBoxSearch connected')
  }
}

customElements.define('combo-box-search', ComboBoxSearch)
