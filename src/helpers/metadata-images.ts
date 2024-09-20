import { type Metadata } from "next"
import { type OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import { type IImageData } from "@/types/type"
import { replaceURLImage } from "@/lib/replace-url-image"

interface IData {
  images: IImageData[]
}

interface IReturn {
  images: NonNullable<Exclude<OpenGraph["images"], "OGImage" | string | URL | "OGImageDescriptor">>
  icons: Metadata["icons"]
}

export function metadataImages({ images = [] }: IData) {
  const imagesAndIconsOpenGraph: IReturn = {
    icons: {},
    images: [],
  }

  if (images.length > 0) {
    for (const image of images) {
      if (Array.isArray(imagesAndIconsOpenGraph.images)) {
        imagesAndIconsOpenGraph.images!?.push({
          url: replaceURLImage(image.attributes.url),
          alt: image.attributes.alt,
          width: 256,
          height: 256,
          type: "image/png",
        })
      }
    }

    imagesAndIconsOpenGraph.icons = {
      icon: {
        url: replaceURLImage(images?.[0]?.attributes?.url!),
        rel: "icon",
        fetchPriority: "low",
      },
    }
  }

  return {
    icons: imagesAndIconsOpenGraph.icons,
    images: Array.isArray(imagesAndIconsOpenGraph.images) ? imagesAndIconsOpenGraph.images : [],
  }
}
