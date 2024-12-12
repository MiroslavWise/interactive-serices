import { NextImageMotion } from "@/components/common"

import { useVisiblePhotosCarousel, dispatchCurrentPhoto } from "@/store"

import { cx } from "@/lib/cx"

export function FooterPhotos() {
  const photos = useVisiblePhotosCarousel(({ photos }) => photos)
  const isVisible = useVisiblePhotosCarousel(({ isVisible }) => isVisible)
  const currentPhoto = useVisiblePhotosCarousel(({ currentPhoto }) => currentPhoto)

  return (
    <ul
      className={cx(
        "absolute bottom-[10%] left-0 right-0 top-[80%] w-full inline-flex gap-2.5 justify-center items-center transition-all duration-200",
        isVisible ? "translate-y-0" : "max-md:translate-y-full",
      )}
    >
      {photos?.map((item) => (
        <li
          className={cx(
            "h-full rounded-md border-2 border-solid overflow-hidden cursor-pointer transition-all border-text-secondary aspect-[9/16]",
            currentPhoto?.id === item?.id && "!border-text-accent !aspect-video",
          )}
          key={`${item.url}_${item?.id}`}
        >
          <NextImageMotion
            src={item?.url!}
            alt="offer-image"
            width={240}
            height={240}
            className="w-full h-full object-cover"
            onClick={() => {
              dispatchCurrentPhoto({ currentPhoto: item })
            }}
            hash={item?.hash}
          />
        </li>
      ))}
    </ul>
  )
}
