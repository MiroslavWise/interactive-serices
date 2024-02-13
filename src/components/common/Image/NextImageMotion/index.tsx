"use client"

import NextImage from "next/image"

import type { IProps } from "./types"

import { ImageStatic } from "../ImageStatic"

// import { myImageLoader } from "@/helpers/functions/myImageLoader"
import { blurDefaultOffer, defaultAvatar } from "@/helpers/image/base64"

const altName = {
  avatar: "/svg/profile-null.svg",
  "offer-image": "/png/blur-default-offers.jpg",
}

type TTypes = typeof NextImage.defaultProps & IProps

export const NextImageMotion = (props: TTypes) => {
  const { src, ref, alt, className, height, width, ...rest } = props ?? {}

  return typeof src === "string" && src?.includes("http") ? (
    <NextImage
      placeholder={altName.hasOwnProperty(alt) ? "blur" : "empty"}
      blurDataURL={
        altName.hasOwnProperty(alt) && alt === "avatar" ? defaultAvatar : alt === "offer-image" ? blurDefaultOffer : blurDefaultOffer
      }
      ref={ref}
      data-image={alt}
      className={className || ""}
      loading="lazy"
      src={src}
      alt={alt}
      height={height}
      width={width}
      style={{
        objectFit: "cover",
      }}
      {...rest}
    />
  ) : (
    <ImageStatic
      src={alt === "avatar" ? "/svg/profile-null.svg" : "/png/blur-default-offers.jpg"}
      placeholder="blur"
      blurDataURL={blurDefaultOffer}
      alt={alt}
      unoptimized
      className={className}
      height={height}
      width={width}
      style={{
        objectFit: "cover",
      }}
      {...rest}
    />
  )
}
