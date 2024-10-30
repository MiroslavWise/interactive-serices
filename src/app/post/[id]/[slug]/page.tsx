import { permanentRedirect } from "next/navigation"

export default ({ params: { id } }: { params: { id: string } }) => permanentRedirect(`/post/${id}`)
