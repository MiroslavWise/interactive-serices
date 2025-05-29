"use client"

import Button from "@/components/common/Button"

import { dispatchModal, EModalData, useAuth } from "@/store"
import { useNavigator } from "@/helpers/hooks/use-navigator"

export const FooterAsideLeft = () => {
  const user = useAuth(({ user }) => user)

  function handleOut() {
    dispatchModal(EModalData.OutAccount)
  }

  const { id, profile } = user ?? {}

  const linkUser =
    `/user/${id}` +
    (profile?.username && !profile?.username.includes(`$`) && !profile?.username.includes("/") ? `/${profile?.username}` : "")

  const onShare = useNavigator({
    url: linkUser,
    title: profile?.firstName ?? "Имя",
  })

  return (
    <footer className="w-full flex flex-col gap-2.5 mt-auto mb-5" data-test="footer-aside-profile">
      {/* <Button
        type="button"
        typeButton="fill-primary"
        label="Обучение"
        prefixIcon={<img src="/svg/graduation-cap.svg" alt="" width={24} height={24} className="w-6 h-6" />}
        onClick={handleOpen}
        className="h-9"
        data-test="footer-aside-profile-button-on-modal-instruction"
      /> */}
      <Button
        type="button"
        typeButton="regular-primary"
        label="Поделиться"
        className="bg-btn-second-default !h-9 py-1.5 px-4 [&>span]:text-sm !rounded-[1.125rem]"
        onClick={onShare}
      />
      <section className="w-full flex flex-row justify-between items-end gap-3">
        <div className="flex flex-col items-start">
          <p className="text-text-secondary text-xs text-left font-normal">Нужна помощь?</p>
          <p className="text-text-secondary text-xs text-left font-normal">
            Пишите в телеграм:{" "}
            <a href="https://t.me/sheirainfo" target="_blank" data-test="footer-aside-profile-link-telegram" className="text-text-accent">
              @sheirainfo
            </a>
          </p>
          {/* <Link className="text-text-accent text-xs text-left font-normal" href={{ pathname: "/legal/privacy-policy" }} target="_blank">
            Политика конфиденциальности
          </Link> */}
        </div>
        <button
          type="button"
          onClick={handleOut}
          data-test="footer-aside-profile-button-on-modal-out"
          className="w-8 h-8 p-4 relative border-none outline-none bg-grey-field rounded-full"
        >
          <img
            src="/svg/log-out.svg"
            alt="out"
            width={16}
            height={16}
            className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </button>
      </section>
    </footer>
  )
}
