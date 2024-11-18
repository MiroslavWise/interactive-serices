import { CldOgImage } from "next-cloudinary"

import { getPostId } from "@/services/posts"

export default async ({ params: { id } }: { params: { id: string | number } }) => {
  const { data } = await getPostId(id)

  if (!data) return null

  const findFirstNote = data.notes.find((item) => item.main)

  if (!findFirstNote) return null

  const images = []

  for (const item of findFirstNote.images) {
    if (item.attributes.mime.includes("image")) {
      images.push(item)
      break
    }
  }

  if (images.length > 0) {
    const image = images[0]

    return (
      <CldOgImage
        src={image.attributes.url}
        alt={image.attributes.name}
        tint="100:0762a0"
        opacity="60"
        overlays={[
          {
            text: {
              color: "white",
              fontFamily: "Source Sans Pro",
              fontSize: 120,
              fontWeight: "bold",
              text: data?.title,
            },
          },
        ]}
        twitterTitle={data?.title}
      />
    )
  }

  return null
}
