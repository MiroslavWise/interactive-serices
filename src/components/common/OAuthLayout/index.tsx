import { type PropsWithChildren, Suspense } from "react"

interface IProps {}



function OAuthLayout({ children }: PropsWithChildren<IProps>) {
  return <Suspense fallback={null}>{children}</Suspense>
}

export default OAuthLayout
