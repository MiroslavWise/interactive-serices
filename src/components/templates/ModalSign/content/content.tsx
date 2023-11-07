"use client"

import { memo, useState } from "react"
import { IResetEmailData } from "../types/types"

export const Content = memo(function Content() {
    const [valueEmail, setValueEmail] = useState<IResetEmailData>({
        email: "",
        password_reset_expires: null,
        password_reset_token: "",
    })

    return <></>
})
