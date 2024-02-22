"use client"

// import { type Metadata } from "next"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { UserIdPage } from "@/components/profile"

import { usePush } from "@/helpers"
import { getUserId } from "@/services"

// export async function generateMetadata({ searchParams }: { searchParams: { id: string | number } }): Promise<Metadata> {
//     if (searchParams?.id) {
//         try {
//             const { ok, res } = await serviceUsers.getId(searchParams?.id!)

//             if (ok && res) {
//                 const openGraph: Metadata["openGraph"] = {
//                     title: `${res?.profile?.firstName || ""} ${res?.profile?.lastName || ""}`,
//                     description: res?.profile?.about,
//                     images: [],
//                 }

//                 const twitter: Metadata["twitter"] = {
//                     title: `${res?.profile?.firstName || ""} ${res?.profile?.lastName || ""}`,
//                     images: [],
//                 }

//                 if (res?.profile?.image?.attributes?.url) {
//                     const images: (typeof openGraph)["images"] | (typeof twitter)["images"] = {
//                         url: res?.profile?.image?.attributes?.url,
//                         alt: `${res?.profile?.firstName || ""} ${res?.profile?.lastName || ""}`,
//                         type: res?.profile?.image?.attributes?.mime,
//                     }
//                     openGraph.images = images
//                     twitter.images = images
//                 }

//                 return {
//                     title: `${res?.profile?.firstName || ""} ${res?.profile?.lastName || ""}`,
//                     description: res?.profile?.about,
//                     openGraph,
//                     twitter,
//                 }
//             }
//         } catch (e) {
//             console.log("response error: ", e)
//             return { title: `user ${searchParams?.id}` }
//         }

//         return { title: `user ${searchParams?.id}` }
//     }

//     return { title: `user ${searchParams?.id}` }
// }

// export default async function UserId({ searchParams }: { searchParams: { id: string } }) {
//     try {
//         if (searchParams?.id === "undefined" || typeof searchParams?.id === "undefined" || searchParams?.id === "null") {
//             return redirect("/")
//         }

//         const { ok, res } = await serviceUsers.getId(searchParams?.id!)

//         if (ok === false) {
//             return redirect("/")
//         }

//         return <UserIdPage id={searchParams?.id!} user={res!} ok={ok} />
//     } catch (e) {
//         console.log("error response user: ", e)
//         return redirect("/")
//     }
// }

export default function UserId() {
  const id = useSearchParams().get("id")
  const { handlePush } = usePush()

  const { data, isLoading } = useQuery({
    queryFn: () => getUserId(id!),
    queryKey: ["user", { userId: id }],
    enabled: id !== "undefined" && id !== "null" && typeof id !== undefined,
    refetchOnReconnect: true,
    retry: true,
  })

  const { res, ok } = data ?? {}

  useEffect(() => {
    if (id === undefined || typeof id === "undefined" || ok === false) {
      handlePush("/")
    }
  }, [id, ok])

  return <UserIdPage id={id!} user={res!} ok={ok!} isLoading={isLoading} />
}
