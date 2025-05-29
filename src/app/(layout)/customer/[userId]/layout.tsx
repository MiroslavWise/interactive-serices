import { type PropsWithChildren, type ReactNode } from "react"

import WrapperMobileMenu from "./components/WrapperMobileMenu"
import ContentMobileMenu from "./components/ContentMobileMenu"
import { EProviderLinkCustomer } from "./components/LinkService"
import WrapperPseudoModalAboutProfile from "./components/WrapperPseudoModalAboutProfile"
import ContentPseudoModalAboutProfile from "./components/ContentPseudoModalAboutProfile"

import { cx } from "@/lib/cx"
import ComponentsServices from "./components/ComponentsServices"
import ComponentLinks from "./components/ComponentLinks"

export interface IParamsCustomer {
  params: {
    userId: string | number
  }
  searchParams: {
    provider?: EProviderLinkCustomer
  }
}

interface IProps extends IParamsCustomer {
  profile: ReactNode
  feedback: ReactNode
}

export default ({ profile, children, feedback, params: { userId } }: PropsWithChildren<IProps>) => (
  <>
    <main
      className={cx(
        "h-full w-full bg-transparent p-0",
        "md:overflow-hidden md:pt-[calc(var(--height-header-nav-bar)_+_1.5rem)] md:pb-5 md:px-6 z-[4] md:static md:grid md:grid-cols-[17.125rem_minmax(0,1fr)_25rem] md:gap-6",
        "overflow-x-hidden overflow-y-auto px-2.5 pt-2.5 max-md:flex max-md:flex-col max-md:gap-2.5 max-md:pb-[calc(var(--height-mobile-footer-nav)_+_0.625rem)]",
      )}
    >
      {profile}
      <section className="w-full flex flex-col gap-6 md:overflow-y-auto md:py-6 md:-my-6">
        {children}
        <div className="w-full flex flex-col gap-2.5">
          <ComponentLinks />
          <ComponentsServices userId={userId} />
        </div>
      </section>
      {feedback}
    </main>
    <WrapperPseudoModalAboutProfile>
      <ContentPseudoModalAboutProfile userId={userId} />
    </WrapperPseudoModalAboutProfile>
    <WrapperMobileMenu>
      <ContentMobileMenu userId={userId} />
    </WrapperMobileMenu>
  </>
)
