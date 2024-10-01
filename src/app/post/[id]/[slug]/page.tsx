import { redirect } from "next/navigation"
export default ({ params: { id } }: { params: { id: string } }) => redirect(`/post/${id}`)
