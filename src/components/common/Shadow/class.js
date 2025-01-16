import { daysAgo } from "@/helpers"

class XP extends HTMLTimeElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const time = this.getAttribute("time")

    const element = document.createElement("time")
    element.style.color = "var(--text-secondary)"
    element.style.fontWeight = "400"
    element.style.fontSize = "0.75rem"
    element.style.lineHeight = "1rem"
    element.style.textAlign = "start"
    element.style.whiteSpace = "nowrap"
    element.style.margin = "0"
    element.style.padding = "0"
    element.dateTime = time ?? ""

    element.textContent = daysAgo(time)

    this.appendChild(element)
  }
}
customElements.define("x-p", XP, { extends: "time" })
