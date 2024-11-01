import { type PropsWithChildren } from "react"

import WrapperContext from "./components/ContextChats"

export default ({ children }: PropsWithChildren) => <WrapperContext>{children}</WrapperContext>
