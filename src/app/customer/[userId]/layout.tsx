import { cache, type ReactNode } from "react"

import { EProviderLinkCustomer } from "./components/ServicesAndConversations"

import WrapperPseudoModalAboutProfile from "./components/WrapperPseudoModalAboutProfile"
import ContentPseudoModalAboutProfile from "./components/ContentPseudoModalAboutProfile"

export interface IParamsCustomer {
  params: {
    userId: string | number
  }
  searchParams: {
    provider?: EProviderLinkCustomer
  }
}

interface IProps extends IParamsCustomer {
  children: ReactNode
  profile: ReactNode
  feedback: ReactNode
}

export default ({ profile, children, feedback, params: { userId } }: IProps) => {
  return (
    <>
      <main className="h-full w-full overflow-x-hidden overflow-y-auto md:overflow-hidden bg-transparent p-0 md:pt-[calc(var(--height-header-nav-bar)_+_1.5rem)] md:pb-[1.25rem] px-6 z-[4] relative md:static grid grid-cols-[17.125rem_minmax(0,1fr)_25rem] gap-6">
        {profile}
        {children}
        {feedback}
      </main>
      <WrapperPseudoModalAboutProfile>
        <ContentPseudoModalAboutProfile userId={userId} />
      </WrapperPseudoModalAboutProfile>
    </>
  )
}
