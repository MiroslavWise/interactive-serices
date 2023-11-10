import { ImageLoaderProps } from "next/image"

export function myImageLoader({
    src,
    width,
    quality,
}: ImageLoaderProps) {
    return `${src}&w=${width}&dpr=${quality ? quality : 1}`
}
