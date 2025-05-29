import { permanentRedirect, RedirectType } from "next/navigation"

export default ({ params: { id } }: { params: { id: string } }) => permanentRedirect(`/post/${id}`, RedirectType.replace)
