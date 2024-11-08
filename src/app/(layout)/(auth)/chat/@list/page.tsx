import dynamic from "next/dynamic"

import Loading from "./loading"

const Page = dynamic(() => import("./components/Page"), { loading: Loading })

export default Page
