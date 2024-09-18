import { redirect } from "next/navigation"

import RedirectOffer from "./components/RedirectOffer"

import { getPostId } from "@/services/posts"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async ({ params }: { params: { id: string } }) => {
  const { id } = params ?? {}
  if (!id) return redirect("/")

  const { data } = await getPostId(id)

  return null

  // if (data) {
  //   return <RedirectOffer post={data} />
  // } else {
  //   return redirect("/")
  // }
}
