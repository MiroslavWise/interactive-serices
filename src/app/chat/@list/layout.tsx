import { type ReactNode } from "react"

import WrapperContext from "./components/ContextChats"

export default ({ children }: { children: ReactNode }) => <WrapperContext>{children}</WrapperContext>
