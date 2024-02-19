const arrayOne: number[] = []

for (let i = 1; i <= 18; i++) {
  arrayOne.push(i)
}

export const ICON_SET_OFFERS: number[] = [...arrayOne, 20, 21, 22, 23, 24, 54, 55, 57, 58, 66, 69, 77]

const map: Map<number | string, string> = new Map(ICON_SET_OFFERS.map((item) => [item, `/svg/category/${item}.svg`]))
map.set("default", "/svg/category/default.svg")

export function IconCategory(id: string | number) {
  return map.has(id) ? map.get(id) : map.get("default")
}
