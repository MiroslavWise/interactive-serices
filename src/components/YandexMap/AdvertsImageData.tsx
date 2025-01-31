import { useState } from "react"

import { IImageData } from "@/types/type"

import { NextImageMotion } from "../common"

import { cx } from "@/lib/cx"

interface IProps {
  images: IImageData[]
  handle(event: any): void
}

function AdvertsImageData({ images, handle }: IProps) {
  const [state, setState] = useState(0)
  const image = images[state]

  return (
    <div
      className={cx("group rounded-md overflow-hidden w-20 h-20 cursor-pointer", images.length > 0 ? "relative z-10" : "hidden")}
      onClick={handle}
    >
      {image ? (
        <NextImageMotion
          src={image.attributes.url}
          hash={image.attributes.blur}
          alt=""
          width={80}
          height={80}
          className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 z-20"
        />
      ) : null}
      <div
        className={cx(
          "absolute inset-0 bg-translucent z-30 opacity-100 transition-opacity group-hover:opacity-0",
          images.length > 1 ? "flex items-center justify-center" : "hidden",
        )}
      >
        <span className="text-base text-text-button text-center">{images.length}</span>
      </div>
      <div className={cx("absolute inset-0 opacity-0 z-40", images.length > 1 ? "flex flex-row w-full h-full" : "hidden")}>
        {images.map((item, index) => (
          <div key={`:sd:sdd:ff:d-${item.id}`} onMouseOver={() => setState(index)} className="w-full h-full" />
        ))}
      </div>
    </div>
  )
}
export default AdvertsImageData
