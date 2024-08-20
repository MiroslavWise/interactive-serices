const arrayOne: number[] = []

for (let i = 1; i <= 18; i++) {
  arrayOne.push(i)
}

const ICON_SET_OFFERS: number[] = [...arrayOne, 20, 21, 22, 23, 24, 54, 55, 57, 58, 66, 69, 77]

const map: Map<number | string, string> = new Map(ICON_SET_OFFERS.map((item) => [item, `/svg/category/${item}.svg`]))
const mapPNG: Map<number | string, string> = new Map(ICON_SET_OFFERS.map((item) => [item, `/png/category/${item}.png`]))
map.set("default", "/svg/category/default.svg")
mapPNG.set("default", "/png/category/default.png")
export const IconCategory = (id: string | number) => (map.has(id) ? map.get(id) : map.get("default"))
export const IconCategoryPNG = (id: string | number) => (mapPNG.has(id) ? mapPNG.get(id) : mapPNG.get("default"))
