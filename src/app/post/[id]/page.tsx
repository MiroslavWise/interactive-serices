import { redirect } from "next/navigation"

import RedirectOffer from "./components/RedirectOffer"

import { getPostId } from "@/services/posts"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async ({ params: { id } }: { params: { id: string } }) => {
  if (!id) return redirect("/")

  const { data } = await getPostId(id)

  if (data) {
    return <RedirectOffer post={data} />
  } else {
    return redirect("/")
  }
}
