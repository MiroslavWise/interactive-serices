import { Button } from "@/components/common"
import IconCheck from "@/components/icons/IconCheck"

import { cx } from "@/lib/cx"
import { dispatchModalClose } from "@/store"

function SuccessProvideFeedback() {
  return (
    <>
      <article className="w-full flex flex-col gap-5 items-center">
        <div className="relative pb-2 flex flex-col ">
          <div
            className={cx(
              "relative w-10 h-10 flex *:absolute *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 rounded-full items-center justify-center z-[5]",
              "before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-more-field",
              "after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-more-field",
              "before:w-8 before:h-8 before:rounded-2xl before:opacity-30 before:-z-[2]",
              "after:w-10 after:h-10 after:rounded-[1.25rem] after:opacity-15 after:-z-[1]",
            )}
          >
            <div className="w-6 h-6 flex items-center justify-center *:w-4 *:h-4 bg-more-field">
              <IconCheck />
            </div>
          </div>
        </div>
        <h3 className="text-text-primary font-semibold text-2xl text-center">Отзыв успешно отправлен</h3>
        <p className="text-text-primary text-center font-normal text-sm">После модерации отзыв появится на странице пользователя.</p>
      </article>
      <Button type="button" typeButton="fill-primary" label="Понятно" onClick={dispatchModalClose} className="md:max-w-56" />
    </>
  )
}

SuccessProvideFeedback.displayName = "SuccessProvideFeedback"
export default SuccessProvideFeedback
