import { type IImageData } from "@/types/type"

import ItemServiceImagesClient from "./ItemServiceImages-client"

import { cx } from "@/lib/cx"

function ItemServiceImages({ images = [] }: { images: IImageData[] }) {
  return (
    <div
      className={cx(
        "scroll-no",
        !images.length && "!hidden",
        "w-[calc(100%_+_2rem)] h-[4.875] -mx-4 min-h-[4.875] max-h-[4.875] relative overflow-hidden !px-0",
      )}
    >
      <ItemServiceImagesClient images={images} />
    </div>
  )
}

ItemServiceImages.displayName = "ItemServiceImages"
export default ItemServiceImages
