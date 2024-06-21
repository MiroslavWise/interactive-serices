import { cx } from "@/lib/cx"
import { type IImageData } from "@/store/types/useAuthState"

function ItemServiceImages({ images = [] }: { images: IImageData[] }) {
  return <div className={cx(!images.length && "!hidden")}></div>
}

ItemServiceImages.displayName = "ItemServiceImages"
export default ItemServiceImages
