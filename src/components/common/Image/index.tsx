
import NextImage from "next/image"
import { motion } from "framer-motion"

import type { TImage } from "./types"

import myImageLoader from "@/helpers/functions/myImageLoader"

const MotionImage = motion(NextImage)

export const Image: TImage = ({
  src, alt, height, width,
}) => {

  return (
    <MotionImage
      loader={myImageLoader}
      placeholder="blur"
      src={src}
      alt={alt}
      height={height}
      width={width}
    />
  )
}