const objStrength = {
  upper: /[A-ZА-ЯЁ]/g,
  lower: /[a-zа-яё]/g,
  number: /[0-9]/g,
  symbols: /[[:punct:]]/g,
}

export function strengthPassword(value: string) {
  if (!value || !value?.trim()) return 0

  let strength = 0
  const valuesObj = Object.values(objStrength)

  for (const item of valuesObj) {
    const split = value.split("")
    const bool = split.some((_) => item.test(_))
    if (bool) {
      strength++
    }
  }

  if (value.length > 5) {
    strength++
  }

  return strength / (valuesObj.length + 1) || 0
}
