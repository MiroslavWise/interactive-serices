import { redirect } from "next/navigation"

export default ({ params }: { params: { id: string } }) => {
  const { id } = params ?? {}

  const urlRedirect = `/customer/${id}`

  if (!id) {
    return redirect("/")
  } else {
    return redirect(urlRedirect)
  }
}
