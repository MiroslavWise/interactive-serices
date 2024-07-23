export function cx(...classes: any[]): string {
  let str = ""

  for (const item of classes) {
    if (typeof item === "string") {
      str += ` ${item}`
    } else {
      continue
    }
  }

  return str
}
