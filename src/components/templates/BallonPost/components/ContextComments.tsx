import { useQuery } from "@tanstack/react-query"
import { Dispatch, type ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { type INotes } from "@/services/notes/types"

import { useAuth, useBalloonPost } from "@/store"
import { getPostsComments, type IPostsComment } from "@/services/posts-comments"

const defaultDataContext: IContext = {
  list: [],
  isLoading: false,
  writeResponse: null,
  noteCurrent: null,
  isBecomeMember: false,
  onUpdate() {},
  onWriteResponse() {},
  onNoteCurrent() {},
  countCommentNote: () => 0,
}

const createContextComments = createContext<IContext>(defaultDataContext)

function ContextComments({ children }: { children: ReactNode }) {
  const post = useBalloonPost(({ data }) => data)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [list, setList] = useState<IPostsComment[]>([])
  const [writeResponse, setWriteResponse] = useState<INotes | null>(null)
  const [noteCurrent, setNoteCurrent] = useState<number | null>(null)

  const isBecomeMember = !post?.archive && !!post?.isParticipants && (!userId || (!!userId && userId !== post?.userId))

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

  function onNoteCurrent(id: number | null) {
    setNoteCurrent(id)
  }

  useEffect(() => {
    if (data?.data) {
      setList(Array.isArray(data?.data) && (!!userId ? true : !isBecomeMember) ? data?.data : [])
    }
  }, [data?.data, userId, isBecomeMember])

  const countCommentNote = useCallback((id: number) => list.filter((_) => _?.noteId === id).length, [list])

  return (
    <createContextComments.Provider
      value={{
        list,
        isLoading,
        writeResponse,
        isBecomeMember,
        onUpdate,
        onWriteResponse,
        noteCurrent,
        onNoteCurrent,
        countCommentNote,
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
  isBecomeMember: boolean
  writeResponse: INotes | null
  noteCurrent: number | null
  onUpdate: Dispatch<IPostsComment>
  onNoteCurrent: Dispatch<number | null>
  onWriteResponse: Dispatch<INotes | null>
  countCommentNote: (value: number) => number
}
