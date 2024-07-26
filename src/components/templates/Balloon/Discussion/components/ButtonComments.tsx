import { Dispatch, SetStateAction } from "react"
import { useQuery } from "@tanstack/react-query"

import IconComment from "@/components/icons/IconComment"

import { getComments } from "@/services"

interface IProps {
  id: number

  setExpandComment: Dispatch<SetStateAction<boolean>>
}

export const ButtonComments = ({ id, setExpandComment }: IProps) => {
  const { data: dataComments } = useQuery({
    queryFn: () => getComments({ offer: id! }),
    queryKey: ["comments", { offerThreads: id! }],
    enabled: !!id,
  })

  const length = dataComments?.data?.length || 0

  function handleOnExpand() {
    setExpandComment(true)
  }

  return (
    <button type="button" onClick={handleOnExpand}>
      <IconComment />
      <span>{length}</span>
    </button>
  )
}
