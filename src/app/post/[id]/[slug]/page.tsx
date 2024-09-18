import { redirect } from "next/navigation"
export default ({ params }: { params: { id: string } }) => redirect(`/post/${params.id}`)
