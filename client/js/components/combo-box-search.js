/* global HTMLElement, customElements, SubmitEvent */
import parser from 'uri-template'

export class ComboBoxSearch extends HTMLElement {
  #field
  #form
  #data = {}
  #resultList
  #searchTemplate
  #selectHandler = (e) => this.onSelect(e)
  #changeHandler = (e) => this.onChange(e)

  constructor () {
    super()

    this.#resultList = resultList()
    this.insertAdjacentElement('beforeend', this.#resultList)
  }

  async connectedCallback () {
    this.#form = this.closest('form')
    this.#field = this.querySelector('input[type="text"]')
    this.#field.autocomplete = 'off'
    this.addEventListener('combo-item:select', this.#selectHandler)

    if (this.src !== undefined) {
      if (!this.reactive) {
        this.#data = await this.fetchData(this.src)
      } else {
        this.#searchTemplate = parser.parse(this.src)
      }
      this.#field?.addEventListener('input', this.#changeHandler)
    }
  }

  async onChange (e) {
    const value = this.#field.value
    let data

    if (this.reactive) {
      const url = this.#searchTemplate.expand({ q: value })
      data = await this.fetchData(url)
    } else {
      data = this.#data.filter(item => item.text.toLowerCase().startsWith(value.toLowerCase()))
    }

    this.#resultList.update(data)
  }

  onSelect (e) {
    console.log(e)
    this.#field.value = e.detail.value
    this.#form?.dispatchEvent(new SubmitEvent('submit', { submitter: this, bubbles: true }))
  }

  updateField (value) {
    this.#field.value = value
  }

  async fetchData (src) {
    const response = await fetch(src)
    if (!response.ok) {
      console.warn('Error fetching data for', src)
      return []
    }
    const data = await response.json()
    return data
  }

  get src () {
    return this.getAttribute('src')
  }

  get reactive () {
    return this.hasAttribute('reactive')
  }
}

customElements.define('combo-box-search', ComboBoxSearch)

function resultList () {
  const list = document.createElement('combo-box-result-list')
  list.classList.add('hidden')
  return list
}
