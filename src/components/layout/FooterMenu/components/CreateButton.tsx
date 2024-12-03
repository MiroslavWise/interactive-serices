import IconPlus from "@/components/icons/IconPlus"

import { cx } from "@/lib/cx"
import { useSign } from "../hooks/useSign"
import { useStatusAuth } from "@/helpers/use-status-auth"
import { dispatchNewServicesBanner, EModalData, EStatusAuth, useModal } from "@/store"

const TITLE = "Создать"

export const CreateButton = () => {
  const statusAuth = useStatusAuth()
  const handleAuthModal = useSign()
  const isCreateModal = useModal(({ data }) => data === EModalData.NewServicesBanner)

  return (
    <a
      className="h-full flex-[1] flex-shrink-0 flex pt-1 pb-[0.1875rem] px-[0.0625rem] flex-col no-underline relative"
      onClick={(event) => {
        event.stopPropagation()
        if (statusAuth !== EStatusAuth.CHECK) {
          if (statusAuth === EStatusAuth.AUTHORIZED) {
            dispatchNewServicesBanner()
            event.preventDefault()
          } else if (statusAuth === EStatusAuth.UNAUTHORIZED) {
            event.preventDefault()
            handleAuthModal()
          }
        }
      }}
      title="Создать предложение, обсуждение или SOS-сообщение"
      aria-label="Создать предложение, обсуждение или SOS-сообщение"
      aria-labelledby="Создать предложение, обсуждение или SOS-сообщение"
      data-test="link-footer-menu-mobile-create"
    >
      <section className="h-full flex flex-col items-center gap-[0.1875rem]">
        <div
          className={cx(
            "relative w-5 h-6 rounded-full flex items-center justify-center p-3 bg-BG-filter",
            "[&>svg>path]:fill-text-button *:transition-transform *:duration-200",
            isCreateModal ? "*:rotate-180" : "*:rotate-0",
          )}
          id="id-create-menu-footer"
        >
          <IconPlus />
        </div>
        <p className="mt-auto justify-end text-center text-[0.6875rem] leading-[1.125rem] font-medium text-text-secondary">{TITLE}</p>
      </section>
    </a>
  )
}
