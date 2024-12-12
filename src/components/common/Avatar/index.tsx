"use client"

import Link from "next/link"
import { type HTMLAttributes } from "react"

import { type IImageData } from "@/types/type"

import { NextImageMotion } from "../Image"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { cx } from "@/lib/cx"
import { useResize } from "@/helpers"
import { dispatchPublicProfile } from "@/store"

interface IProps {
  image?: IImageData
  className?: HTMLAttributes<HTMLDivElement>["className"]
  userId?: number
}

function Avatar({ className, image, userId }: IProps) {
  const { isTablet } = useResize()

  if (!!userId)
    return (
      <Link
        {...{
          target: isTablet ? "_blank" : undefined,
          href: isTablet ? { pathname: `/customer/${userId}` } : {},
          className: cx("relative flex overflow-hidden cursor-pointer", className, !!image ? "bg-BG-second" : "bg-grey-stroke-light"),
          onClick() {
            if (!isTablet) {
              dispatchPublicProfile(userId!)
            }
          },
        }}
      >
        {!!image ? (
          <NextImageMotion
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            src={image?.attributes?.url!}
            alt="avatar"
            width={160}
            height={160}
            hash={image?.attributes?.blur}
          />
        ) : (
          <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full scale-50" />
        )}
      </Link>
    )

  return (
    <a className={cx("relative flex overflow-hidden", className, !!image ? "bg-BG-second" : "bg-grey-stroke-light")}>
      {!!image ? (
        <NextImageMotion
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          src={image?.attributes?.url!}
          alt="avatar"
          width={160}
          height={160}
          hash={image?.attributes?.blur}
        />
      ) : (
        <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full scale-50" />
      )}
    </a>
  )
}

Avatar.displayName = "Avatar"
export default Avatar
