"use client"

import Link from "next/link"
import { type PropsWithChildren } from "react"
import { useQuery } from "@tanstack/react-query"
import { parseAsBoolean, parseAsInteger, useQueryState } from "nuqs"

import Avatar from "@avatar"
import Button from "@/components/common/Button"
import ComponentCompanyEdit from "./ComponentCompanyEdit"
import { NextImageMotion } from "@/components/common/Image"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { getCompanyId } from "@/services/companies"

function ComponentCompanyId({ children }: PropsWithChildren) {
  const [companyId] = useQueryState("companyId", parseAsInteger)
  const [isEdit, setIsEdit] = useQueryState("is-edit", parseAsBoolean.withDefault(false))

  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getCompanyId(companyId!),
    queryKey: ["company", companyId],
    enabled: !!companyId,
  })

  const { image, title = "", inn = "", ogrn = "", erid = "", ad, owner } = data?.data ?? {}

  if (isLoading)
    return (
      <div className="w-full h-full py-5">
        <section className="w-full h-full rounded-2 bg-BG-first border border-grey-field overflow-hidden overflow-y-hidden flex flex-col gap-3"></section>
      </div>
    )

  if (isEdit && data?.data) return <ComponentCompanyEdit company={data?.data} setIsEdit={setIsEdit} refetch={refetch} />

  const dataComponent = (
    <div className="w-full h-full py-5">
      <section className="w-full h-full rounded-2 bg-BG-first border border-grey-field overflow-hidden overflow-y-hidden flex flex-col gap-3 pt-5">
        <article className="w-full flex flex-col gap-2 px-5">
          <div className="w-full grid grid-cols-[5rem_minmax(0,1fr)] gap-3 pb-5 border-b border-grey-stroke-light">
            <div className="aspect-square w-20 h-20 rounded-md overflow-hidden relative bg-grey-field">
              {image ? (
                <NextImageMotion
                  src={image.attributes.url}
                  alt={title ?? ""}
                  width={80}
                  height={80}
                  hash={image.attributes.blur}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
                />
              ) : (
                <span />
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <span className="text-base text-text-primary font-medium">{title}</span>
              <span className="text-sm text-text-secondary font-normal">ИНН: {inn}</span>
              <span className={cx(ogrn ? "text-sm text-text-secondary font-normal" : "hidden")}>ОГРН: {ogrn}</span>
              <span className={cx(erid ? "text-sm text-text-secondary font-normal" : "hidden")}>erid: {erid}</span>
              <span className={cx(ad ? "text-sm text-text-secondary font-normal" : "hidden")}>Описание: {ad}</span>
            </div>
          </div>
          {owner ? (
            <article className="w-full flex flex-col gap-2 items-start max-w-96">
              <h3 className="text-xl font-semibold text-text-primary">Глава компании</h3>
              <Link
                href={{ pathname: `/customer/${owner?.id}` }}
                target="_blank"
                className="w-full p-1.5 bg-grey-field border border-element-accent-1 rounded-md grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 items-center"
              >
                <Avatar image={owner?.image} className="rounded-md h-10 w-10 aspect-square p-5" />
                <div className="w-full flex flex-col gap-1 justify-between items-start">
                  <div className="w-full flex flex-row items-center gap-1">
                    <p className=" text-text-primary text-sm font-medium line-clamp-1 overflow-ellipsis">
                      {owner?.firstName ?? "Имя"} {owner?.lastName ?? ""}
                    </p>
                    <div className="w-5 h-5 flex items-center justify-center p-[0.0625rem]">
                      <IconVerifiedTick />
                    </div>
                  </div>
                  <a className="text-sm font-medium text-text-accent w-fit">{owner?.email ? owner?.email : null}</a>
                </div>
              </Link>
            </article>
          ) : (
            <article className="w-full flex flex-col gap-2 items-start max-w-96">
              <h3 className="text-xl font-semibold text-text-primary">Компания активно продвигается с помощью рекламы</h3>
              <p className="text-bs text-text-secondary font-medium">
                Благодаря эффективным рекламным кампаниям, она укрепляет свои позиции на рынке, демонстрирует свои продукты и услуги целевой
                аудитории и формирует положительный имидж. Реклама помогает компании выделяться среди конкурентов и подчеркивать свои
                уникальные преимущества.
              </p>
            </article>
          )}
        </article>
        <footer className="mt-auto p-5 flex flex-col gap-2 border-t border-grey-stroke-light">
          <div className="w-full flex flex-col md:flex-row items-center justify-start gap-2">
            <Button type="button" label="Редактировать" className="md:max-w-[15.625rem]" onClick={() => setIsEdit(true)} />
            <Button
              type="button"
              typeButton="white"
              label="Заблокировать компанию"
              className="md:max-w-[15.625rem] [&>span]:text-text-error"
              onClick={() => {}}
            />
            <Button
              type="button"
              typeButton="regular-primary"
              label="Удалить компанию"
              className="md:max-w-[15.625rem]"
              onClick={() => {}}
            />
          </div>
        </footer>
      </section>
    </div>
  )

  return companyId ? (data?.data ? dataComponent : children) : children
}

ComponentCompanyId.displayName = "ComponentCompanyId"
export default ComponentCompanyId
