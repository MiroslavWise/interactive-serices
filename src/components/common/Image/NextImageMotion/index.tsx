"use client"

import { memo } from "react"
import NextImage from "next/image"
import { motion } from "framer-motion"

import type { IProps } from "./types"

import { ImageStatic } from "../ImageStatic"

import { myImageLoader } from "@/helpers/functions/myImageLoader"
import { blurDefaultOffer, defaultAvatar } from "@/helpers/image/base64"

const MotionImage = motion(NextImage)

const altName = {
    avatar: "/png/blur_avatar_default.jpg",
    "offer-image": "/png/blur-default-offers.jpg",
}

type TTypes = typeof MotionImage.defaultProps & IProps

const $NextImageMotion = (props: TTypes) => {
    const { src, onClick, ref, alt, className, height, width, ...rest } =
        props ?? {}
    function handleClick(e: any) {
        if (onClick) {
            e.preventDefault()
            e.stopPropagation()
            onClick()
        }
    }

    return src?.includes("http") ? (
        <MotionImage
            onClick={(e) => {
                handleClick(e)
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
            loader={myImageLoader}
            loading="lazy"
            src={src}
            alt={alt}
            height={height}
            width={width}
            style={{
                objectFit: "cover",
            }}
        />
    ) : (
        <ImageStatic
            onClick={(e: any) => handleClick(e)}
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
            style={{
                objectFit: "cover",
            }}
            {...rest}
        />
    )
}

export const NextImageMotion = memo($NextImageMotion)
