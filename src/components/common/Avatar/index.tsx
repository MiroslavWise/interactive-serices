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

/** Функция для рендеринга аватара (изображение или иконка) */
const renderAvatar = (image?: IImageData) => {
  if (image?.attributes?.url) {
    return (
      <NextImageMotion
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        src={image.attributes.url}
        alt="avatar"
        width={160}
        height={160}
        hash={image.attributes.blur}
      />
    )
  }
  return <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full scale-50" />
}

function Avatar({ className, image, userId }: IProps) {
  const { isTablet } = useResize()

  /** Общие стили для контейнера аватара */
  const containerStyles = cx(
    "relative flex overflow-hidden",
    className,
    image ? "bg-BG-second" : "bg-grey-stroke-light",
    userId && "cursor-pointer",
  )

  /** Обработчик клика для открытия профиля */
  const handleClick = () => {
    if (!isTablet && userId) {
      dispatchPublicProfile(userId)
    }
  }

  /** Если есть userId, используем Link, иначе — обычный div */
  if (userId) {
    return (
      <Link
        target={isTablet ? "_blank" : undefined}
        href={isTablet ? `/customer/${userId}` : {}}
        className={containerStyles}
        onClick={handleClick}
      >
        {renderAvatar(image)}
      </Link>
    )
  }

  return <div className={containerStyles}>{renderAvatar(image)}</div>
}

Avatar.displayName = "Avatar"
export default Avatar
