import { redirect } from "next/navigation"

export default ({ params: { id } }: { params: { id: string } }) => (id ? redirect(`/customer/${id}`) : redirect("/"))
