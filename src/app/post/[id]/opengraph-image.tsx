import { ImageResponse } from "next/og"

import { getPostId } from "@/services/posts"
import { replaceURLImage } from "@/lib/replace-url-image"

export const contentType = "image/png"

export default async function Image({ params }: { params: { id: string | number } }) {
  const { id } = params ?? {}
  const { data } = await getPostId(id)

  const notes = data?.notes ?? []
  const mainNote = notes?.find((item) => item.main)
  const images = mainNote?.images ?? []
  const currentImage = images?.[0]

  const urlImage = currentImage?.attributes

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        {urlImage ? (
          <img
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              height: 720,
              width: 1280,
              objectFit: "cover",
              zIndex: 50,
            }}
            src={replaceURLImage(urlImage?.url!)}
            width={480}
            height={480}
            alt={urlImage!?.hash}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.1)",
            zIndex: 60,
          }}
        />
      </div>
    ),
    {
      width: 1280,
      height: 720,
    },
  )
}
