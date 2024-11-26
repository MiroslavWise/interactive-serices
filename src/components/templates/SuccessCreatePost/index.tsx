import Button from "@/components/common/Button"
import IconPost from "@/components/icons/IconPost"
import IconCheck from "@/components/icons/IconCheck"

import { cx } from "@/lib/cx"
import { dispatchModalClose } from "@/store"

function SuccessCreatePost() {
  return (
    <>
      <article className="w-full flex flex-col gap-5 items-center">
        <div className="relative pb-2 flex flex-col w-[4.375rem]">
          <div className="w-[4.375rem] h-[4.375rem] rounded-[2.1875rem] bg-grey-field flex items-center justify-center p-[1.1875rem] *:w-8 *:h-8">
            <IconPost />
          </div>
          <div
            className={cx(
              "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl top-[calc(100%_-_0.5rem)] w-6 h-6 flex items-center justify-center p-1 bg-more-field z-[5]",
              "*:w-4 *:h-4",
              "before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-more-field",
              "after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-more-field",
              "before:w-8 before:h-8 before:rounded-2xl before:opacity-30 before:-z-[2]",
              "after:w-10 after:h-10 after:rounded-[1.25rem] after:opacity-15 after:-z-[1]",
            )}
          >
            <IconCheck />
          </div>
        </div>
        <h3 className="text-text-primary font-semibold text-2xl text-center">Мы скоро разместим Пост на карте</h3>
        <p className="text-text-primary text-center font-normal text-sm">
          Ваш пост сейчас отправлен на модерацию, после проверки вы получите уведомление об этом в личном кабинете
        </p>
      </article>
      <Button type="button" typeButton="fill-primary" label="Понятно" onClick={dispatchModalClose} className="md:max-w-56" />
    </>
  )
}

SuccessCreatePost.displayName = "SuccessCreatePost"
export default SuccessCreatePost
