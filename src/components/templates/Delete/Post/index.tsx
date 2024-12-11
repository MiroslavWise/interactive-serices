import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import Button from "@/components/common/Button"

import { deletePostId, getPosts } from "@/services/posts"
import { dispatchCloseDeletePost, dispatchModalClose, useAuth, useDeletePost } from "@/store"

function DeletePost() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)
  const id = useDeletePost(({ id }) => id)
  const title = useDeletePost(({ title }) => title)

  const { refetch } = useQuery({
    queryFn: () => getPosts({ order: "DESC", user: userId! }),
    queryKey: ["posts", { userId: userId!, order: "DESC" }],
    enabled: false,
  })

  async function handle() {
    if (!loading) {
      setLoading(true)
      await deletePostId(id!)
      refetch()
      setLoading(false)
      requestAnimationFrame(() => {
        dispatchModalClose()
      })
    }
  }

  useEffect(() => {
    return () => dispatchCloseDeletePost()
  }, [])

  return (
    <>
      <article>
        <div data-img>
          <img src="/svg/trash-accent.svg" alt="trash" width={20} height={20} />
        </div>
        <h2>Вы хотите удалить пост &#171;{title ?? ""}&#187;?</h2>
      </article>
      <footer>
        <Button type="button" typeButton="fill-primary" label="Да, удалить" onClick={handle} loading={loading} />
        <Button type="button" typeButton="regular-primary" label="Нет, оставить" onClick={dispatchModalClose} loading={loading} />
      </footer>
    </>
  )
}

DeletePost.displayName = "DeletePost"
export default DeletePost
