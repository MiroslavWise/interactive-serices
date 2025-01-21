/**
 * @description Модальное окно для добавления рекламы
 */
"use client"

import FormNewCompany from "./components/FormNewCompany"

import { cx } from "@/lib/cx"
import { useAddAdvert } from "@/store"
import FormSelectCompany from "./components/FormSelectCompany"

function AddAdverts() {
  const id = useAddAdvert(({ id }) => id)
  const type = useAddAdvert(({ type }) => type)
  const isOpen = type !== null && id !== null

  return (
    <div
      className={cx(
        "fixed inset-0 bg-translucent w-full h-full z-[2000] max-md:h-dvh",
        isOpen ? "flex flex-col items-center justify-end md:justify-center md:py-5" : "hidden",
      )}
    >
      <section className="w-full bg-BG-second md:rounded-2 p-5 md:p-10 pt-9 md:pt-5 relative md:max-w-[33.75rem] flex flex-col gap-3 h-full overflow-hidden overflow-y-auto">
        <FormSelectCompany />
        <div className="w-full grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 items-center">
          <div className="w-full border-t border-dashed border-grey-stroke-light" />
          <span className="text-center whitespace-nowrap text-xs  text-text-secondary">или создать новую</span>
          <div className="w-full border-t border-dashed border-grey-stroke-light" />
        </div>
        <FormNewCompany />
      </section>
    </div>
  )
}

AddAdverts.displayName = "AddAdverts"
export default AddAdverts
