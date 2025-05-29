import { type PropsWithChildren } from "react"

import AuthChatContext from "./components/AuthChatContext"

export default ({ children }: PropsWithChildren) => <AuthChatContext>{children}</AuthChatContext>
