"use client"

import { memo } from "react"
import NextImage from "next/image"
import { motion } from "framer-motion"

import type { TImage } from "./types"

import myImageLoader from "@/helpers/functions/myImageLoader"
import { blurDefaultOffer, defaultAvatar } from "@/helpers/image/base64"

const MotionImage = motion(NextImage)

const altName = {
    avatar: "/png/blur_avatar_default.jpg",
    "offer-image": "/png/blur-default-offers.jpg",
}

const ImageMotion: TImage = ({
    src,
    alt,
    height,
    width,
    className,
    onClick,
}) => {
    function handleClick() {
        if (onClick) {
            onClick()
        }
    }

    return src?.includes("http") ? (
        <MotionImage
            onClick={handleClick}
            placeholder={altName.hasOwnProperty(alt) ? "blur" : "empty"}
            blurDataURL={
                altName.hasOwnProperty(alt) && alt === "avatar"
                    ? defaultAvatar
                    : alt === "offer-image"
                    ? blurDefaultOffer
                    : blurDefaultOffer
            }
            className={className || ""}
            loader={myImageLoader}
            loading="lazy"
            src={src}
            alt={alt}
            height={height}
            width={width}
            style={{
                objectFit: "cover",
            }}
            objectFit="cover"
        />
    ) : (
        <NextImage
            src={
                alt === "avatar"
                    ? "/png/default_avatar.png"
                    : "/png/blur-default-offers.jpg"
            }
            placeholder="blur"
            blurDataURL={blurDefaultOffer}
            alt={alt}
            className={className}
            height={height}
            width={width}
            style={{
                objectFit: "cover",
            }}
            data-image={alt}
            unoptimized
        />
    )
}

export const NextImageMotion = memo(ImageMotion)
