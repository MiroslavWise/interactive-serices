import { useQuery } from "@tanstack/react-query"

import IconComment from "@/components/icons/IconComment"

import { getPostsComments } from "@/services/posts-comments"

function CommentsCount({ id }: { id: number }) {
  const { data } = useQuery({
    queryFn: () => getPostsComments({ post: id! }),
    queryKey: ["posts-comments", { postId: id! }],
    enabled: !!id,
  })

  const count = data?.meta?.total || 0

  return (
    <div className="px-2.5 w-fit bg-[var(--card-bg-yellow)] py-[0.3125rem] gap-1 grid grid-cols-[1.25rem_minmax(0,1fr)] items-center">
      <div className="w-5 h-5 relative p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
        <IconComment />
      </div>
      <span className="text-text-secondary text-xs font-medium whitespace-nowrap">{count}</span>
    </div>
  )
}

CommentsCount.displayName = CommentsCount
export default CommentsCount
