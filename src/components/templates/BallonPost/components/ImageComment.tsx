import { type IImageData } from "@/types/type"

import { NextImageMotion } from "@/components/common"
import { dispatchPhotoCarousel } from "@/store"

interface IProps {
  images: IImageData[]
}

function ImageComment({ images }: IProps) {
  if (images.length === 0) return null

  return (
    <div className="w-full flex flex-row items-center gap-1 flex-nowrap">
      {images.map((item) => (
        <div
          className="relative h-12 w-12 p-2 rounded-md overflow-hidden"
          key={`:d:SD:fA:${item.id}:`}
          onClick={() => {
            const photos = []
            for (const item of images) {
              photos.push({
                url: item?.attributes?.url!,
                id: item?.id,
                hash: item?.attributes?.blur,
              })
            }
            dispatchPhotoCarousel({
              visible: true,
              photos: photos,
              idPhoto: item?.id!,
            })
          }}
        >
          <NextImageMotion
            src={item.attributes.url}
            alt="offer-image"
            width={80}
            height={80}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12"
            hash={item?.attributes?.blur}
          />
        </div>
      ))}
    </div>
  )
}

ImageComment.displayName = "ImageComment"
export default ImageComment
