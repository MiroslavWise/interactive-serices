interface I {
  setCurrent(value: string): void
  url: {
    [key: string]: (string | Date)[]
  }
}

const obj: I = {
  setCurrent(value) {
    if (this.url[value] && this.url[value].length > 0) {
      this.url[value].push(new Date())
    } else {
      this.url[value] = [new Date()]
    }
  },
  url: {},
}

export { obj }
