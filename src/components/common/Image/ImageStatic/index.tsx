import { memo } from "react"
import Image from "next/image"

import type { IPropsImageStatic } from "./types"

import { cx } from "@/lib/cx"

type TImage = typeof Image.defaultProps & IPropsImageStatic

function $ImageStatic(props: TImage) {
    const { src, alt, classNames, onClick } = props ?? {}

    return (
        <Image
            {...props}
            onClick={(event) => {
                event.stopPropagation()
                if (onClick) {
                    onClick()
                }
            }}
            src={src}
            alt={alt}
            data-image={alt}
            className={cx(classNames)}
            loader={undefined}
            loading={undefined}
            style={{
                objectFit: "cover",
            }}
            unoptimized
        />
    )
}

export const ImageStatic = memo($ImageStatic)
