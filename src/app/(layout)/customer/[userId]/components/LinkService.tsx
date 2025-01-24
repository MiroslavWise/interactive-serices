export enum EProviderLinkCustomer {
  "offer" = "offer",
  "discussion" = "discussion",
  "alert" = "alert",
  post = "post",
}

export interface ILink {
  label: string
  provider: EProviderLinkCustomer
}

const LinkService = ({ label, provider, active, on }: ILink & { active: boolean; on(value: EProviderLinkCustomer): void }) => (
  <a
    className={`w-full h-full rounded-[1.125rem] flex flex-row items-center justify-center px-4 ${
      active && "!bg-element-accent-2"
    } hover:bg-grey-field`}
    onClick={() => on(provider)}
  >
    <span className={`text-text-secondary text-center text-sm font-medium ${active && "!text-text-tab"}`}>{label}</span>
  </a>
)

LinkService.displayName = "LinkService"
export default LinkService
