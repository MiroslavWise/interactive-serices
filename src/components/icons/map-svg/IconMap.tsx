import { ReactElement, type DispatchWithoutAction } from "react"

import { type IImageData } from "@/types/type"
import { EnumTypeProvider } from "@/types/enum"

import Offer from "./offer"
import Alert from "./alert"
import Posts from "./posts"

/** @deprecated */
import IconPost from "@/components/icons/IconPost"
import IconCategoryDefault from "../IconCategoryDefault"
import IconAlertCirlceRed from "@/components/icons/IconAlertCirlceRed"
import { NextImageMotion } from "@/components/common/Image"

interface IProps {
  image?: IImageData
  provider: EnumTypeProvider
  onClick: DispatchWithoutAction
  urgent?: boolean
  isAdvertising?: boolean
}

const prov = {
  [EnumTypeProvider.offer]: (urgent: boolean) => <Offer urgent={!!urgent} />,
  [EnumTypeProvider.alert]: (urgent: boolean) => <Alert urgent={!!urgent} />,
  [EnumTypeProvider.POST]: (urgent: boolean) => <Posts urgent={!!urgent} />,
} as Record<EnumTypeProvider, (urgent: boolean) => ReactElement>

const icon = (value: EnumTypeProvider) => (prov.hasOwnProperty(value!) ? prov[value!]! : (urgent: boolean) => null)

const Rainbow = {
  [EnumTypeProvider.offer]: <IconCategoryDefault />,
  [EnumTypeProvider.alert]: <IconAlertCirlceRed />,
  [EnumTypeProvider.POST]: <IconPost />,
} as Record<EnumTypeProvider, ReactElement>

const iconRainbow = (value: EnumTypeProvider) => (Rainbow.hasOwnProperty(value!) ? Rainbow[value!]! : null)

export default ({ provider, onClick, urgent, isAdvertising, image }: IProps) =>
  isAdvertising ? (
    <>
      <div className="div-rainbow z-10 rounded-full overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[2.1875rem] h-[2.1875rem] flex" />
      <div className="z-20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-7 h-7 bg-BG-second overflow-hidden *:w-5 *:h-5 flex items-center justify-center">
        {!!image ? (
          <NextImageMotion
            src={image?.attributes?.url}
            hash={image?.attributes?.blur}
            alt={provider}
            width={80}
            height={80}
            className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full"
          />
        ) : (
          iconRainbow(provider)
        )}
      </div>
    </>
  ) : (
    <svg
      width={urgent ? "43" : "35"}
      height={urgent ? "53" : "41"}
      viewBox={urgent ? "0 0 43 53" : "0 0 35 41"}
      fill="none"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[2.1875rem] h-[2.5625rem]"
      onClick={(event) => {
        if (isAdvertising) return
        event.stopPropagation()
        onClick()
      }}
    >
      {icon(provider)(!!urgent)}
    </svg>
  )
