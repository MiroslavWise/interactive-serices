export function replaceURLImage(value: string): string {
  return value.replace("?format=webp", "?format=png")
}
