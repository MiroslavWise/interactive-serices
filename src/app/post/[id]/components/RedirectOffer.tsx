"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { type IPosts } from "@/services/posts/types"

import { clg } from "@console"
import { dispatchBallonPost, dispatchMapCoordinates } from "@/store"

function RedirectOffer({ post }: { post: IPosts }) {
  const { push } = useRouter()

  useEffect(() => {
    if (post) {
      clg(`post: ${post.id}`, post)
      const geoData = post?.addresses?.length > 0 ? post?.addresses[0] : null
      if (geoData) {
        dispatchMapCoordinates({
          zoom: 17,
          coordinates: geoData?.coordinates?.split(" ")?.map(Number),
        })
      }
      dispatchBallonPost(post)
      push("/")
    }
  }, [post])

  return null
}

RedirectOffer.displayName = "RedirectOffer"
export default RedirectOffer
