import { ButtonLink } from "@/components/common/Button"
import ComponentCompanyId from "../components/ComponentCompanyId"
import ComponentListCompanies from "../components/ComponentListCompanies"

export default () => (
  <section className="w-full grid grid-cols-[1fr,2fr] px-5 gap-7 bg-BG-second h-full">
    <ComponentListCompanies />
    <ComponentCompanyId>
      <div className="w-full h-full py-5">
        <section className="w-full h-full flex items-center justify-center p-10 rounded-2 bg-BG-first border border-grey-field">
          <article className="w-full flex flex-col gap-3 items-center md:max-w-[25rem]">
            <p className="text-text-primary text-sm font-normal text-center">
              Как менеджер, вы обладаете правами для добавления новых компаний в систему. Это позволяет вам расширять базу данных и
              управлять списком компаний, с которыми взаимодействует ваша команда.
            </p>
            <ButtonLink
              typeButton="fill-primary"
              label="Создать компанию"
              href={{ pathname: "/manager/companies/create" }}
              prefetch
              className="max-w-[15.625rem]"
            />
          </article>
        </section>
      </div>
    </ComponentCompanyId>
  </section>
)
