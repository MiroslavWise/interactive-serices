import { type INotes } from "@/services/notes/types"

import { IconSprite } from "@/components/icons/icon-sprite"

import { useContextPostsComments } from "./ContextComments"

function ComponentNoteInComment({ note }: { note: INotes }) {
  const { onWriteResponse } = useContextPostsComments()

  return (
    <article className="w-full relative grid grid-cols-[minmax(0,1fr)_1.25rem]">
      <div></div>
      <button type="button" className="w-5 h-5 relative p-2.5 *:w-5 *:h-5" onClick={() => onWriteResponse(null)}>
        <IconSprite id="x-close-20-20" />
      </button>
    </article>
  )
}

ComponentNoteInComment.displayName = "ComponentNoteInComment"
export default ComponentNoteInComment
