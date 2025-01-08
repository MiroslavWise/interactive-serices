import { type DispatchWithoutAction } from "react"

import { type IImageData } from "@/types/type"
import { EnumTypeProvider } from "@/types/enum"

import Offer from "./offer"
import Alert from "./alert"
import Posts from "./posts"
import { cx } from "@/lib/cx"

interface IProps {
  image?: IImageData
  provider: EnumTypeProvider
  onClick: DispatchWithoutAction
  urgent?: boolean
  isAdvertising?: boolean
}

const prov = new Map([
  [EnumTypeProvider.offer, (urgent: boolean) => <Offer urgent={!!urgent} />],
  [EnumTypeProvider.alert, (urgent: boolean) => <Alert urgent={!!urgent} />],
  [EnumTypeProvider.POST, (urgent: boolean) => <Posts urgent={!!urgent} />],
])

const icon = (value: EnumTypeProvider) => (prov.has(value!) ? prov.get(value!)! : (urgent: boolean) => null)

export default ({ provider, onClick, urgent, isAdvertising }: IProps) => (
  <svg
    width={urgent ? "43" : "35"}
    height={urgent ? "53" : "41"}
    viewBox={urgent ? "0 0 43 53" : "0 0 35 41"}
    fill="none"
    className={cx(
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[2.1875rem] h-[2.5625rem]",
      isAdvertising && "svg-icon-map",
    )}
    onClick={(event) => {
      if (isAdvertising) return
      event.stopPropagation()
      onClick()
    }}
  >
    {icon(provider)(!!urgent)}
  </svg>
)
