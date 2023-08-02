"use client"

import NextImage from "next/image"
import { motion } from "framer-motion"

import type { TImage } from "./types"

import myImageLoader from "@/helpers/functions/myImageLoader"

const MotionImage = motion(NextImage)

const altName = {
  avatar: "/png/blur_avatar_default.jpg",
}

const altPlaceholder = ["avatar"]

export const NextImageMotion: TImage = ({
  src, alt, height, width, className,
}) => {

  return (
    <MotionImage
      placeholder={altName.hasOwnProperty(alt) ? "blur" : "empty"}
      blurDataURL={altName.hasOwnProperty(alt) && alt === "avatar" ? altName.avatar : ""}
      className={className}
      loader={ myImageLoader}
      src={src}
      alt={alt}
      height={height}
      width={width}
      style={{
        objectFit: "cover"
      }}
    />
  )
}