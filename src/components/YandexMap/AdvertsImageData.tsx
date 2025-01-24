import { IImageData } from "@/types/type"

import { NextImageMotion } from "../common"

import { cx } from "@/lib/cx"

interface IProps {
  images: IImageData[]
  handle(event: any): void
}

function AdvertsImageData({ images, handle }: IProps) {
  const image = images[0]

  return (
    <div
      className={cx("rounded-md overflow-hidden w-10 h-10 cursor-pointer", images.length > 0 ? "relative z-10" : "hidden")}
      onClick={handle}
    >
      {image ? (
        <NextImageMotion
          src={image.attributes.url}
          hash={image.attributes.blur}
          alt=""
          width={80}
          height={80}
          className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-20"
        />
      ) : null}
      <div
        className={cx(
          "absolute inset-0 bg-translucent z-30 opacity-100 transition-opacity hover:opacity-0",
          images.length > 0 ? "flex items-center justify-center" : "hidden",
        )}
      >
        <span className="text-base text-text-button text-center">{images.length}</span>
      </div>
    </div>
  )
}
export default AdvertsImageData
