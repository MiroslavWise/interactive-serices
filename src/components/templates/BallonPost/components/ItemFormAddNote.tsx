import IconXClose from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { useContextPostsComments } from "./ContextComments"
import { NextImageMotion } from "@/components/common"

function ItemFormAddNote() {
  const { writeResponse, onWriteResponse } = useContextPostsComments()

  const description = writeResponse?.description ?? null
  const images = writeResponse?.images ?? []

  return (
    <div
      className={cx(
        "w-full pl-2.5 border-l-2 border-solid border-[var(--card-svg-yellow)]",
        !!writeResponse ? "grid grid-cols-[minmax(0,1fr)_1.25rem] gap-5" : "hidden",
      )}
    >
      {description ? (
        <p className="text-text-primary text-sm font-normal line-clamp-1 text-ellipsis">
          <span className="font-medium">Запись:</span> {writeResponse?.description ?? null}
        </p>
      ) : (
        <div className="flex flex-row items-center gap-1 flex-nowrap">
          <span className="text-text-primary text-sm font-medium">Запись:</span>
          <span className="text-text-primary text-sm font-normal">Фотографии</span>
          <article className="flex flex-row flex-nowrap gap-0.5">
            {images.map((item) => (
              <div
                className="relative h-4 w-4 p-2 rounded-[0.0625rem] overflow-hidden *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4"
                key={`:key:img:${item.id}:`}
              >
                <NextImageMotion src={item.attributes.url} alt="offer-image" width={40} height={40} hash={item?.attributes?.blur} />
              </div>
            ))}
          </article>
        </div>
      )}
      <button
        type="button"
        className="w-5 h-5 relative p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"
        onClick={() => onWriteResponse(null)}
      >
        <IconXClose />
      </button>
    </div>
  )
}

ItemFormAddNote.displayName = "ItemFormAddNote"
export default ItemFormAddNote
