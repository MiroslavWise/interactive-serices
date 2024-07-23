import { redirect } from "next/navigation"

import { decryptedUser } from "@/helpers/cript"

export default ({ params }: { params: { "hash-user": string } }) => {
  const { "hash-user": hash } = params ?? {}
  const id = decryptedUser(hash)

  const urlRedirect = `/customer/${id}`

  if (!id) {
    return redirect("/")
  } else {
    return redirect(urlRedirect)
  }
}
