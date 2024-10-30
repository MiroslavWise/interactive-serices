import { permanentRedirect } from "next/navigation"

export default ({ params: { id } }: { params: { id: string } }) => (id ? permanentRedirect(`/customer/${id}`) : permanentRedirect("/"))
