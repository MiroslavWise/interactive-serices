import Image from "next/image"

import type { IPropsImageStatic } from "./types"

type TImage = typeof Image.defaultProps & IPropsImageStatic

export function ImageStatic(props: TImage) {
    const { src, alt, onClick } = props ?? {}

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
            loader={undefined}
            loading={undefined}
            style={{
                objectFit: "cover",
            }}
            unoptimized
        />
    )
}
