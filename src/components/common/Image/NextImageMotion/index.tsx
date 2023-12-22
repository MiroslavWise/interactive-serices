"use client"

import { memo } from "react"
import NextImage from "next/image"

import type { IProps } from "./types"

import { ImageStatic } from "../ImageStatic"

// import { myImageLoader } from "@/helpers/functions/myImageLoader"
import { blurDefaultOffer, defaultAvatar } from "@/helpers/image/base64"

const altName = {
    avatar: "/png/blur_avatar_default.jpg",
    "offer-image": "/png/blur-default-offers.jpg",
}

type TTypes = typeof NextImage.defaultProps & IProps

export const NextImageMotion = (props: TTypes) => {
    const { src, onClick, ref, alt, className, height, width, ...rest } = props ?? {}

    return src?.includes("http") ? (
        <NextImage
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            placeholder={altName.hasOwnProperty(alt) ? "blur" : "empty"}
            blurDataURL={
                altName.hasOwnProperty(alt) && alt === "avatar"
                    ? defaultAvatar
                    : alt === "offer-image"
                    ? blurDefaultOffer
                    : blurDefaultOffer
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
            onClick={(e: any) => {
                if (onClick) {
                    onClick()
                }
            }}
            src={alt === "avatar" ? "/png/default_avatar.png" : "/png/blur-default-offers.jpg"}
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
