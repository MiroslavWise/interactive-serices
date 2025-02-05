import { ReactElement, type DispatchWithoutAction } from "react"

import { type IImageData } from "@/types/type"
import { EnumTypeProvider } from "@/types/enum"

/** @deprecated */
import IconPost from "@/components/icons/IconPost"
import IconCategoryDefault from "../IconCategoryDefault"
import { NextImageMotion } from "@/components/common/Image"
import IconAlertCirlceRed from "@/components/icons/IconAlertCirlceRed"
import { IconSpriteMap } from "../icon-sprite-map"

interface IProps {
  image?: IImageData
  provider: EnumTypeProvider
  onClick: DispatchWithoutAction
  categoryId?: number
  urgent?: boolean
  isAdvertising?: boolean
}

const Rainbow = {
  [EnumTypeProvider.offer]: <IconCategoryDefault />,
  [EnumTypeProvider.alert]: <IconAlertCirlceRed />,
  [EnumTypeProvider.POST]: <IconPost />,
} as Record<EnumTypeProvider, ReactElement>

const iconRainbow = (value: EnumTypeProvider) => (Rainbow.hasOwnProperty(value!) ? Rainbow[value!]! : null)

export default ({ provider, onClick, urgent, isAdvertising, image }: IProps) =>
  isAdvertising ? (
    <>
      <div
        onClick={(event) => {
          event.stopPropagation()
          onClick()
        }}
        className="div-rainbow z-10 rounded-full overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[2.1875rem] h-[2.1875rem] flex"
      />
      <div className="z-20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-7 h-7 bg-BG-second overflow-hidden [&>svg]:w-5 [&>svg]:h-5 flex items-center justify-center">
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
    <IconSpriteMap
      className="w-[2.1875rem] h-[2.5625rem] cursor-pointer"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      id={`${provider}-balloon${!!urgent ? "-urgent" : ""}`}
    />
  )

//   <svg
//   width={urgent ? "43" : "35"}
//   height={urgent ? "53" : "41"}
//   viewBox={urgent ? "0 0 43 53" : "0 0 35 41"}
//   fill="none"
//   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[2.1875rem] h-[2.5625rem]"

// >
//   {icon(provider)(!!urgent)}
// </svg>
