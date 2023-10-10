"use client"

import { memo } from "react"
import NextImage from "next/image"
import { motion } from "framer-motion"

import type { TImage } from "./types"

import myImageLoader from "@/helpers/functions/myImageLoader"

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
                    ? altName.avatar
                    : alt === "offer-image"
                    ? altName["offer-image"]
                    : altName["offer-image"]
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
            alt={alt}
            className={className}
            height={height}
            width={width}
            style={{
                objectFit: "cover",
            }}
            data-image={alt}
        />
    )
}

export const NextImageMotion = memo(ImageMotion)
