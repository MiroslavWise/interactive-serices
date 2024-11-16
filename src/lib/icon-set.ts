const ICON_SET_OFFERS: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 54, 55, 57, 58, 66, 69, 77,
]

const map: Map<number | string, string> = new Map(ICON_SET_OFFERS.map((item) => [item, `/svg/category/${item}.svg`]))
const mapPNG: Map<number | string, string> = new Map(ICON_SET_OFFERS.map((item) => [item, `/png/category/${item}.png`]))
map.set("default", "/svg/category/default.svg")
map.set("heart", "/png/category/heart.png")
mapPNG.set("default", "/png/category/default.png")
mapPNG.set("heart", "/png/category/heart.png")
export const iconCategory = (id: string | number, isUrgent: boolean) =>
  map.has(id) ? map.get(id) : isUrgent ? map.get("heart") : map.get("default")
export const iconCategoryPNG = (id: string | number) => (mapPNG.has(id) ? mapPNG.get(id) : mapPNG.get("default"))
