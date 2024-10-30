import { permanentRedirect } from "next/navigation"

export default async ({ params: { id } }: { params: { id: string } }) =>
  id ? permanentRedirect(`/customer/${id}`) : permanentRedirect("/")
