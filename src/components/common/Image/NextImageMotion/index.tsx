"use client"

import NextImage from "next/image"

import type { IProps } from "./types"

import { ImageStatic } from "../ImageStatic"

const blur =
  "data:image/svg+xml;base64,IDxzdmcNCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICAgdmVyc2lvbj0iMS4xIg0KICAgIHZpZXdCb3g9IjAgMCA4MDAgODAwIg0KICA+DQogICAgPGRlZnM+DQogICAgICA8ZmlsdGVyDQogICAgICAgIGlkPSJiYmJsdXJyeS1maWx0ZXIiDQogICAgICAgIHg9Ii0xMDAlIg0KICAgICAgICB5PSItMTAwJSINCiAgICAgICAgd2lkdGg9IjQwMCUiDQogICAgICAgIGhlaWdodD0iNDAwJSINCiAgICAgICAgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ig0KICAgICAgICBwcmltaXRpdmVVbml0cz0idXNlclNwYWNlT25Vc2UiDQogICAgICAgIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiINCiAgICAgID4NCiAgICAgICAgPGZlR2F1c3NpYW5CbHVyDQogICAgICAgICAgc3RkRGV2aWF0aW9uPSI0MCINCiAgICAgICAgICB4PSIwJSINCiAgICAgICAgICB5PSIwJSINCiAgICAgICAgICB3aWR0aD0iMTAwJSINCiAgICAgICAgICBoZWlnaHQ9IjEwMCUiDQogICAgICAgICAgaW49IlNvdXJjZUdyYXBoaWMiDQogICAgICAgICAgZWRnZU1vZGU9Im5vbmUiDQogICAgICAgICAgcmVzdWx0PSJibHVyIg0KICAgICAgICA+PC9mZUdhdXNzaWFuQmx1cj4NCiAgICAgIDwvZmlsdGVyPg0KICAgIDwvZGVmcz4NCiAgICA8ZyBmaWx0ZXI9InVybCgjYmJibHVycnktZmlsdGVyKSI+DQogICAgICA8ZWxsaXBzZSByeD0iMTUwIiByeT0iMTUwIiBjeD0iMzM3LjkxNjQyODA2OTQyMzIiIGN5PSI1NjYuMDgwMTM4MzM4ODciIGZpbGw9ImhzbCgzNywgOTklLCA2NyUpIj48L2VsbGlwc2U+DQogICAgICA8ZWxsaXBzZSByeD0iMTUwIiByeT0iMTUwIiBjeD0iMjA1Ljg3NTU5OTE2NzEwOTg0IiBjeT0iNDc3LjIxNzY1ODM5NzQxNDkiIGZpbGw9ImhzbCgzMTYsIDczJSwgNTIlKSI+PC9lbGxpcHNlPg0KICAgICAgPGVsbGlwc2Ugcng9IjE1MCIgcnk9IjE1MCIgY3g9IjQxMC4wNzM5MjQyMDk1MjUxIiBjeT0iNTQyLjI3MjUxNjUxNzgzMzgiIGZpbGw9ImhzbCgxODUsIDEwMCUsIDU3JSkiPjwvZWxsaXBzZT4NCiAgICAgIDxlbGxpcHNlIHJ4PSIxNTAiIHJ5PSIxNTAiIGN4PSI2MjUuNjk3NzcwMzA5MzgyOCIgY3k9IjE4MC4yOTMwODk3NjE4MDQ0MiIgZmlsbD0iaHNsKDE1MiwgMTAwJSwgNzAlKSI+PC9lbGxpcHNlPg0KICAgICAgPGVsbGlwc2Ugcng9IjE1MCIgcnk9IjE1MCIgY3g9IjYxNi4zNTY0MTk1MzkxMDUiIGN5PSI1MDIuNTk4NTU4NjM2MTU1NTMiIGZpbGw9ImhzbCg1OCwgMTAwJSwgNzElKSI+PC9lbGxpcHNlPg0KICAgICAgPGVsbGlwc2Ugcng9IjE1MCIgcnk9IjE1MCIgY3g9IjU5Ni41NTQ4NjM3NjI1ODU1IiBjeT0iMzkxLjU5MDMyMTU5OTgwMDc1IiBmaWxsPSJoc2woMTUyLCAxMDAlLCA3MCUpIj48L2VsbGlwc2U+DQogICAgICA8ZWxsaXBzZSByeD0iMTUwIiByeT0iMTUwIiBjeD0iMzYxLjA5ODAxOTU4NDkzNTQiIGN5PSIyMjUuOTc3Mjk5Mzk1NjU2MDgiIGZpbGw9ImhzbCgyNSwgMTAwJSwgNjQlKSI+PC9lbGxpcHNlPg0KICAgIDwvZz4NCiAgPC9zdmc+"

const altName = {
  avatar: "/svg/profile-null.svg",
  "offer-image": blur,
}

type TTypes = typeof NextImage.defaultProps & IProps

export const NextImageMotion = (props: TTypes) => {
  const { src, ref, alt, hash, className, height, width, ...rest } = props ?? {}

  return typeof src === "string" && src?.includes("http") ? (
    <NextImage
      placeholder={altName.hasOwnProperty(alt) ? "blur" : "empty"}
      blurDataURL={blur}
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
      src={alt === "avatar" ? "/svg/profile-null.svg" : blur}
      placeholder="blur"
      blurDataURL={blur}
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
