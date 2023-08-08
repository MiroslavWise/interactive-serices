"use client"

import { memo } from "react"
import NextImage from "next/image"
import { motion } from "framer-motion"

import type { TImage } from "./types"

import myImageLoader from "@/helpers/functions/myImageLoader"

const MotionImage = motion(NextImage)

const altName = {
  avatar: "/png/blur_avatar_default.jpg",
}

const ImageMotion: TImage = ({
  src, alt, height, width, className,
}) => {

  return (
    src?.includes("http")
      ?
      <MotionImage
        placeholder={altName.hasOwnProperty(alt) ? "blur" : "empty"}
        blurDataURL={altName.hasOwnProperty(alt) && alt === "avatar" ? altName.avatar : ""}
        className={className}
        loader={myImageLoader}
        src={src}
        alt={alt}
        height={height}
        width={width}
        style={{
          objectFit: "cover"
        }}
      />
      : <NextImage
        src={alt === "avatar" ? "/png/default_avatar.png" : "/png/blur_avatar_default.jpg"}
        alt={alt}
        className={className}
        height={height}
        width={width}
        style={{
          objectFit: "cover"
        }}
      />
  )
}

export const NextImageMotion = memo(ImageMotion)