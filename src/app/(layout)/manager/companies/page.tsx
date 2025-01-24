import { ButtonLink } from "@/components/common/Button"
import ComponentListCompanies from "../components/ComponentListCompanies"

export default () => (
  <section className="w-full grid grid-cols-[1fr,2fr] px-5 gap-7 bg-BG-second h-full">
    <div className="w-full flex flex-col gap-2 py-5">
      <ButtonLink
        typeButton="fill-primary"
        label="Создать компанию"
        href={{
          pathname: "/manager/companies/create",
        }}
        prefetch
        className="!w-fit px-10"
      />
      <ComponentListCompanies />
    </div>
  </section>
)
