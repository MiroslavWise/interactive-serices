import { useQuery } from "@tanstack/react-query"
import { Dispatch, type ReactNode, createContext, useContext, useEffect, useState } from "react"

import { type INotes } from "@/services/notes/types"

import { useBalloonPost } from "@/store"
import { getPostsComments, type IPostsComment } from "@/services/posts-comments"

const defaultDataContext: IContext = {
  list: [],
  isLoading: false,
  onUpdate: () => {},
  writeResponse: null,
  onWriteResponse: () => {},
}

const createContextComments = createContext<IContext>(defaultDataContext)

function ContextComments({ children }: { children: ReactNode }) {
  const post = useBalloonPost(({ data }) => data)
  const [list, setList] = useState<IPostsComment[]>([])
  const [writeResponse, setWriteResponse] = useState<INotes | null>(null)

  const { data, isLoading } = useQuery({
    queryFn: () => getPostsComments({ post: post?.id! }),
    queryKey: ["posts-comments", { postId: post?.id! }],
    refetchOnMount: true,
    enabled: !!post?.id,
  })

  function onUpdate(value: IPostsComment) {
    setList((_) => [..._, value])
  }

  function onWriteResponse(value: INotes | null) {
    setWriteResponse(value)
  }

  useEffect(() => {
    if (data?.data) {
      setList(Array.isArray(data?.data) ? data?.data : [])
    }
  }, [data?.data])

  return (
    <createContextComments.Provider
      value={{
        list,
        isLoading,
        writeResponse,
        onUpdate,
        onWriteResponse,
      }}
    >
      {children}
    </createContextComments.Provider>
  )
}

ContextComments.displayName = "ContextComments"
export default ContextComments

export const useContextPostsComments = () => useContext(createContextComments)

interface IContext {
  list: IPostsComment[]
  isLoading: boolean
  onUpdate: Dispatch<IPostsComment>
  writeResponse: INotes | null
  onWriteResponse: Dispatch<INotes | null>
}
