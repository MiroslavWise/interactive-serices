"use client"

import Image from "next/image"

import { type IPropsImageStatic } from "./types"

type TImage = typeof Image.defaultProps & IPropsImageStatic

export function ImageStatic(props: TImage) {
  const { src, alt, onClick, style } = props ?? {}

  return (
    <Image
      {...props}
      onClick={(event) => {
        if (onClick) onClick(event)
      }}
      src={src}
      alt={alt}
      data-image={alt}
      loader={undefined}
      loading={undefined}
      style={{
        objectFit: "cover",
        ...style,
      }}
      unoptimized
    />
  )
}
