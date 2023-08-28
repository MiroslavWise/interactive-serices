import { memo } from "react"
import Image from "next/image"

import type { IPropsImageStatic } from "./types"

import { cx } from "@/lib/cx"

export function ImageStaticMemo(props: IPropsImageStatic) {
  const { src, alt, classNames, width, height, onClick } = props ?? {}

  return (
    <Image
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      src={src}
      alt={alt}
      className={cx(classNames)}
      width={width}
      height={height}
      loader={undefined}
      loading={undefined}
      style={{
        objectFit: "cover",
      }}
      unoptimized
    />
  )
}

export const ImageStatic = memo(ImageStaticMemo)