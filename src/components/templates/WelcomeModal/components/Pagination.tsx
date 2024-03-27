"use client"

import { ButtonCircleGradientFill } from "@/components/common/Buttons/ButtonCircleGradientFill"

import { cx } from "@/lib/cx"
import { useWelcomeModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

const PAGES = [1, 2, 3, 4]

export const Pagination = () => {
  const page = useWelcomeModal(({ page }) => page)
  const setPage = useWelcomeModal(({ setPage }) => setPage)
  const setPrev = useWelcomeModal(({ setPrev }) => setPrev)
  const setNext = useWelcomeModal(({ setNext }) => setNext)

  return (
    <footer>
      <ButtonCircleGradientFill
        type="primary"
        image={{
          src: "/svg/chevron-left-white.svg",
          size: 20,
        }}
        size={36}
        onClick={setPrev}
        disabled={page === 1}
      />
      <ul className={styles.dots}>
        {PAGES.map((item) => (
          <li key={`${item}_li_page_welcome`} className={cx(item === page && styles.active)} onClick={() => setPage(item)}>
            <div />
          </li>
        ))}
      </ul>
      <ButtonCircleGradientFill
        type="primary"
        image={{
          src: "/svg/chevron-right-white.svg",
          size: 20,
        }}
        size={36}
        onClick={setNext}
        disabled={page >= 4}
      />
    </footer>
  )
}
