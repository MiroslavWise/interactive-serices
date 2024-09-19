import { type IImageData } from "@/types/type"

import { NextImageMotion } from "@/components/common"

function ImageComment({ item }: { item: IImageData }) {
  return (
    <div className="group relative h-4 w-4 p-2 rounded-[0.0625rem] *:absolute">
      <NextImageMotion
        src={item.attributes.url}
        alt="offer-image"
        width={80}
        height={80}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[0.0625rem]"
      />
      <article className="left-1/2 -translate-x-1/2 -top-0.5 -translate-y-3/4 group-hover:-translate-y-full w-16 h-16 rounded-md overflow-hidden border border-solid border-grey-stroke-light flex opacity-0 -z-10 group-hover:z-20 group-hover:opacity-100 transition-all">
        <NextImageMotion src={item.attributes.url} alt="offer-image" width={80} height={80} className="w-16 h-16" />
      </article>
    </div>
  )
}

ImageComment.displayName = "ImageComment"
export default ImageComment
