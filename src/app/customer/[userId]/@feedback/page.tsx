import { cache } from "react"

import { type IParamsCustomer } from "../layout"

import ItemFeedBack from "./components/ItemFeedBack"
import IconFeedBackAccent from "@/components/icons/IconFeedBackAccent"

import { getTestimonials } from "@/services"

const get = cache(getTestimonials)

export default async ({ params }: IParamsCustomer) => {
  const id = params?.userId

  if (!id) return null

  const { res } = await get({ receiver: id! })

  const items = res || []

  return (
    <aside className="w-full h-full rounded-[2rem] bg-BG-second flex flex-col justify-start pt-5 px-5 max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)]">
      <header className="w-full flex flex-col items-center gap-0.625 pb-0.625">
        <h3 className="text-text-primary text-base text-center font-semibold">Отзывы</h3>
      </header>
      {items.length ? (
        <article className="w-full py-0.625 flex items-center gap-5 border-t-[1px] border-b-[1px] border-solid border-grey-stroke-light">
          <p className="text-text-primary text-sm font-medium">{items.length || 0} отзывов</p>
        </article>
      ) : null}
      <section className="w-full h-fit flex flex-col flex-nowrap overflow-x-hidden overflow-y-scroll">
        {items.length === 0 ? (
          <section className="w-full flex flex-col items-center mt-[8.125rem] gap-0.625">
            <div className="w-14 h-14 bg-grey-field rounded-[1.75rem] p-4 flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6">
              <IconFeedBackAccent />
            </div>
            <p className="text-text-primary text-sm font-normal">Нет отзывов</p>
          </section>
        ) : (
          items.map((_) => <ItemFeedBack key={`::key::item::rev::${_.id}::`} {..._} />)
        )}
      </section>
    </aside>
  )
}
