import Link from "next/link"

export enum EProviderLinkCustomer {
  "offer" = "offer",
  "discussion" = "discussion",
  "alert" = "alert",
}

export interface ILink {
  label: string
  provider: EProviderLinkCustomer
}

const LinkService = ({ label, provider, active }: ILink & { active: boolean }) => (
  <Link
    href={{ query: { provider: provider } }}
    className={`w-full h-full rounded-[1.125rem] flex flex-row items-center justify-center ${
      active && "!bg-element-accent-2"
    } hover:bg-grey-field`}
  >
    <span className={`text-text-secondary text-center text-sm font-medium ${active && "!text-text-tab"}`}>{label}</span>
  </Link>
)

LinkService.displayName = "LinkService"
export default LinkService
