/* global HTMLElement, customElements */
import { ComboBoxListItem } from './combo-box-list-item.js'

export class ComboBoxResultList extends HTMLElement {
  #results = []
  #list

  connectedCallback () {
    this.addEventListener('combo-item:select', (e) => { this.hide() })
  }

  update (results) {
    this.#results = results
    this.render(this.#results)
  }

  render (results) {
    this.innerHTML = ''
    this.#list = document.createElement('ul')

    results.forEach(result => {
      const item = ComboBoxListItem.build(result)
      this.#list.insertAdjacentElement('beforeend', item)
    })

    this.insertAdjacentElement('beforeend', this.#list)
    this.show()
  }

  show () {
    this.classList.remove('hidden')
  }

  hide () {
    this.classList.add('hidden')
  }
}

customElements.define('combo-box-result-list', ComboBoxResultList)
