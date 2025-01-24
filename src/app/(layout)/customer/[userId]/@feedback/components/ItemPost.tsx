"use client"

import { useQuery } from "@tanstack/react-query"

import IconPost from "@/components/icons/IconPost"

import { getPostId } from "@/services/posts"
import { dispatchBallonPost } from "@/store"

interface IProps {
  idPost: number
}

function ItemPost({ idPost }: IProps) {
  const { data } = useQuery({
    queryFn: () => getPostId(idPost),
    queryKey: ["post", { id: idPost }],
    enabled: !!idPost,
  })

  const post = data?.data
  const { title = "" } = post ?? {}

  function handle() {
    if (post) {
      dispatchBallonPost(post)
    }
  }

  return (
    <a className="w-full grid gap-1.5 grid-cols-[1.25rem_minmax(0,1fr)] items-center cursor-pointer" onClick={handle}>
      <div className="w-5 h-5 relative p-2 flex items-center justify-center *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
        <IconPost />
      </div>
      <p title={title} aria-labelledby={title} className="line-clamp-1 text-ellipsis text-text-primary text-sm font-normal">
        {title}
      </p>
    </a>
  )
}

ItemPost.displayName = "ItemPost"
export default ItemPost
