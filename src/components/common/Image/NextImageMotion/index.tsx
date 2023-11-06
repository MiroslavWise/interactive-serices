"use client"

import { memo } from "react"
import NextImage from "next/image"
import { motion } from "framer-motion"

import type { IProps } from "./types"

import myImageLoader from "@/helpers/functions/myImageLoader"
import { blurDefaultOffer, defaultAvatar } from "@/helpers/image/base64"
import { ImageStatic } from "../ImageStatic"

const MotionImage = motion(NextImage)

const altName = {
    avatar: "/png/blur_avatar_default.jpg",
    "offer-image": "/png/blur-default-offers.jpg",
}

type TTypes = typeof MotionImage.defaultProps & IProps

const $NextImageMotion = (props: TTypes) => {
    const { src, onClick, ref, alt, className, height, width, ...rest } =
        props ?? {}
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
            ref={ref}
            data-image={alt}
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
        <ImageStatic
            onClick={handleClick}
            src={
                alt === "avatar"
                    ? "/png/default_avatar.png"
                    : "/png/blur-default-offers.jpg"
            }
            placeholder="blur"
            blurDataURL={blurDefaultOffer}
            alt={alt}
            classNames={[className]}
            height={height}
            width={width}
            {...rest}
        />
    )
}

export const NextImageMotion = memo($NextImageMotion)
