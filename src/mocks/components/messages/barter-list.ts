
import type { ISelectList } from "@/components/common/custom/Select/types"

const barterList = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const BARTER_LIST: ISelectList[] = barterList.map(item => ({
  prefix: "/mocks/hair.png",
  label: "Маникюр/педикюр",
  value: `_value-${item}_`,
}))