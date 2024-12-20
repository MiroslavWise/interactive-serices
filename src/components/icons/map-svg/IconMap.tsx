import { type DispatchWithoutAction } from "react"

import { type IImageData } from "@/types/type"
import { EnumTypeProvider } from "@/types/enum"

import Offer from "./offer"
import Alert from "./alert"
import Discussion from "./discussion"

interface IProps {
  image?: IImageData
  provider: EnumTypeProvider
  onClick: DispatchWithoutAction
}

const prov = new Map([
  [EnumTypeProvider.discussion, (image?: IImageData) => <Discussion image={image} />],
  [EnumTypeProvider.offer, (image?: IImageData) => <Offer image={image} />],
  [EnumTypeProvider.alert, (image?: IImageData) => <Alert image={image} />],
])

const icon = (value: EnumTypeProvider) => (prov.has(value!) ? prov.get(value!)! : (image?: IImageData) => null)

export default ({ image, provider, onClick }: IProps) => (
  <svg
    width="35"
    height="41"
    viewBox="0 0 35 41"
    fill="none"
    className="absolute w-[1.8125rem] h-9 inset-0 cursor-pointer"
    onClick={(event) => {
      event.stopPropagation()
      onClick()
    }}
  >
    {icon(provider)(image)}
  </svg>
)
