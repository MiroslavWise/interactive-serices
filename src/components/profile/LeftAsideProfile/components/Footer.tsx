"use client"

import { Button } from "@/components/common"

import { dispatchModal, dispatchOnboarding, EModalData } from "@/store"

import styles from "../styles/footer.module.scss"

export const FooterAsideLeft = () => {
  function handleOut() {
    dispatchModal(EModalData.OutAccount)
  }

  function handleOpen() {
    dispatchOnboarding("open")
  }

  return (
    <footer className={styles.footer} data-test="footer-aside-profile">
      <Button
        type="button"
        typeButton="fill-primary"
        label="Обучение"
        prefixIcon={<img src="/svg/graduation-cap.svg" alt="" width={24} height={24} />}
        onClick={handleOpen}
        data-test="footer-aside-profile-button-on-modal-instruction"
      />
      <section>
        <div>
          <p>Нужна помощь?</p>
          <p>
            Пишите в телеграм:{" "}
            <a href="https://t.me/sheirainfo" target="_blank" data-test="footer-aside-profile-link-telegram">
              @sheirainfo
            </a>
          </p>
        </div>
        <button type="button" onClick={handleOut} data-circle data-test="footer-aside-profile-button-on-modal-out">
          <img src="/svg/log-out.svg" alt="out" width={16} height={16} />
        </button>
      </section>
    </footer>
  )
}
