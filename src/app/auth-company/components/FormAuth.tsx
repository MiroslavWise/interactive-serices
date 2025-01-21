"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

function FormAuth() {
  const [loading, setLoading] = useState(false)
  const { handleSubmit } = useForm()

  const onSubmit = handleSubmit(async () => {})

  return <form className="w-full max-w-[23.125rem]" onSubmit={onSubmit}></form>
}

export default FormAuth
