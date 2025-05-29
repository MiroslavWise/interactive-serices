"use client"

import { type Dispatch, memo } from "react"

import { ImageStatic } from "@/components/common"
import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"

interface IProps {
  files: {
    file: File[]
    string: string[]
  }

  dispatchDelete: Dispatch<number>
}

function SendingPhotos({ dispatchDelete, files }: IProps) {
  const strings = files.string

  return (
    <section
      className={cx(
        "absolute flex flex-row flex-nowrap gap-2 -top-[1px] -translate-y-full right-0 w-full py-2.5 px-3 md:px-5 bg-BG-second border-t border-solid border-grey-stroke overflow-x-scroll justify-end",
        strings.length > 0 ? "!opacity-100 !visible !z-50" : "!opacity-0 !invisible !-z-10",
      )}
    >
      {strings.map((item, index) => (
        <article
          key={`::key::photos::${item}::`}
          className={cx("w-[6.875rem] h-[6.875rem] p-[3.4375rem] rounded-2xl relative bg-text-error z-20 overflow-hidden", "")}
        >
          <button
            type="button"
            onClick={(event) => {
              dispatchDelete(index)
              event.stopPropagation()
            }}
            className="absolute bg-BG-second w-8 h-8 rounded-full p-2 flex items-center justify-center top-1.5 right-1.5 z-30 *:w-4 *:h-4 text-text-primary"
          >
            <IconSprite id="trash-20-20" />
          </button>
          <ImageStatic
            src={item}
            alt="offer-image"
            width={200}
            height={200}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6.875rem] h-[6.875rem]"
          />
        </article>
      ))}
    </section>
  )
}

SendingPhotos.displayName = "SendingPhotos"
export default memo(SendingPhotos)
