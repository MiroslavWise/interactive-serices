import { INotes } from "@/services/notes/types"

function ItemCommentNote({ note }: { note?: INotes }) {
  if (!note) return null

  return <p className="w-full text-text-secondary text-xs font-normal line-clamp-1 text-ellipsis">Запись: {note?.description ?? null}</p>
}

ItemCommentNote.displayName = "ItemCommentNote"
export default ItemCommentNote
