
import NextImage from "next/image"
import { motion } from "framer-motion"

import type { TImage } from "./types"

import myImageLoader from "@/helpers/functions/myImageLoader"

const MotionImage = motion(NextImage)

export const NextImageMotion: TImage = ({
  src, alt, height, width, className,
}) => {

  return (
    <MotionImage
      className={className}
      loader={myImageLoader}
      src={src}
      alt={alt}
      height={height}
      width={width}
    />
  )
}