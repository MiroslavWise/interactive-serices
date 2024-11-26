"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { EnumTypeProvider } from "@/types/enum"

import Button from "@/components/common/Button"

import { useResize } from "@/helpers"
import { CONTENT_ALERT, CONTENT_DISCUSSION, CONTENT_OFFER } from "../constants/steps"
import { useOnboarding, dispatchOnboarding, dispatchOnboardingType, useModal, EModalData } from "@/store"

import styles from "../styles/article-onboarding.module.scss"

export const ArticleOnboarding = () => {
  const [position, setPosition] = useState<{ top: string; left: string }>({ top: "50%", left: "50%" })
  const step = useOnboarding(({ step }) => step)
  const type = useOnboarding(({ type }) => type)
  const valid = useOnboarding(({ valid }) => valid)
  const visible = useOnboarding(({ visible }) => visible)
  const dataModal = useModal(({ data }) => data)
  const refArticle = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (refArticle.current) {
      if (position.top) {
        refArticle.current.style.setProperty("--top", position.top as string)
      }
      if (position.left) {
        refArticle.current.style.setProperty("--left", position.left as string)
      }
    }
  }, [position])

  const { isTablet } = useResize()

  useEffect(() => {
    if (visible) {
      if (!!type && step === 1) {
        if (dataModal === EModalData.NewServicesBanner) {
          const idContainer = document.getElementById("container-services-banner")
          const leftContainer = idContainer?.getBoundingClientRect().left
          const id = document.getElementById(`li-${type}-create`)

          if (id) {
            const top = id?.getBoundingClientRect().top

            if (top && leftContainer) {
              setPosition({
                top: `${top}px`,
                left: `calc(${leftContainer}px - 1.5rem)`,
              })
            }
          }
        }
      }
    }
  }, [step, type, visible, dataModal])

  useEffect(() => {
    if (!isTablet) {
      if (visible) {
        if (!!type && step > 1) {
          if (dataModal === EModalData.CreateNewOptionModal) {
            const idUL = document.getElementById("ul-create-option-modal")
            const idContainer = document.getElementById("container-create-option-modal")

            const leftContainer = idContainer?.getBoundingClientRect().left
            const rightContainer = idContainer?.getBoundingClientRect().right

            const idAddress = document.getElementById("fieldset-create-option-modal-address")
            const idOffer = document.getElementById("fieldset-create-option-modal-offer")
            const idTitle = document.getElementById("fieldset-create-option-modal-title")
            const idPhotos = document.getElementById("fieldset-create-option-modal-photos")
            const idSubmit = document.getElementById("button-create-option-modal-submit")

            const topAddress = idAddress?.getBoundingClientRect().top! < 20 ? 20 : idAddress?.getBoundingClientRect().top!
            const topOffer = idOffer?.getBoundingClientRect().top! < 20 ? 20 : idOffer?.getBoundingClientRect().top!
            const topTitle = idTitle?.getBoundingClientRect().top! < 20 ? 20 : idTitle?.getBoundingClientRect().top!
            const topPhotos = idPhotos?.getBoundingClientRect().top! < 20 ? 20 : idPhotos?.getBoundingClientRect().top!
            const topSubmit = idSubmit?.getBoundingClientRect().top! < 20 ? 20 : idSubmit?.getBoundingClientRect().top!
            const heightSubmit = idSubmit?.getBoundingClientRect().height

            const scrollHandlerUL = () => {
              const idAddressUL = document.getElementById("fieldset-create-option-modal-address")
              const idOfferUL = document.getElementById("fieldset-create-option-modal-offer")
              const idTitleUL = document.getElementById("fieldset-create-option-modal-title")
              const idPhotosUL = document.getElementById("fieldset-create-option-modal-photos")
              const idSubmitUL = document.getElementById("button-create-option-modal-submit")

              const topAddressUL = idAddressUL?.getBoundingClientRect().top! < 20 ? 20 : idAddressUL?.getBoundingClientRect().top!
              const topOfferUL = idOfferUL?.getBoundingClientRect().top! < 20 ? 20 : idOfferUL?.getBoundingClientRect().top!
              const topTitleUL = idTitleUL?.getBoundingClientRect().top! < 20 ? 20 : idTitleUL?.getBoundingClientRect().top!
              const topPhotosUL = idPhotosUL?.getBoundingClientRect().top! < 20 ? 20 : idPhotosUL?.getBoundingClientRect().top!
              const topSubmitUL = idSubmitUL?.getBoundingClientRect().top! < 20 ? 20 : idSubmitUL?.getBoundingClientRect().top!

              if (step === 2) {
                setPosition((prev) => ({
                  ...prev,
                  top: `${topAddressUL}px`,
                }))
              }
              if (step === 2.5) {
                setPosition((prev) => ({
                  ...prev,
                  top: `${topOfferUL}px`,
                }))
              }
              if (step === 3) {
                setPosition((prev) => ({
                  ...prev,
                  top: `${topTitleUL}px`,
                }))
              }
              if (step === 4) {
                setPosition((prev) => ({
                  ...prev,
                  top: `${topPhotosUL}px`,
                }))
              }
              if (step === 5) {
                setPosition((prev) => ({
                  ...prev,
                  top: `${topSubmitUL! + heightSubmit!}px`,
                }))
              }
            }

            setPosition({
              top:
                step === 2
                  ? `${topAddress}px`
                  : step === 2.5
                  ? `${topOffer}px`
                  : step === 3
                  ? `${topTitle}px`
                  : step === 4
                  ? `${topPhotos}px`
                  : step === 5
                  ? `${topSubmit! + heightSubmit!}px`
                  : `1.25rem`,
              left: `calc(${leftContainer}px - 1.5rem)`,
            })
            if (step === 5) {
              setPosition((prev) => ({
                ...prev,
                left: `calc(${rightContainer}px + 1.5rem)`,
                transform: `translate(0, -100%)`,
              }))
            }

            idUL?.addEventListener("scroll", scrollHandlerUL)

            return () => idUL?.removeEventListener("scroll", scrollHandlerUL)
          }
        }
      }
    }
  }, [dataModal, step, type, visible, isTablet])

  function handleClose() {
    dispatchOnboarding("pre-close")
  }

  function handlePrev() {
    dispatchOnboarding("prev")
  }

  function handlePrevType() {
    if (type === EnumTypeProvider.offer) {
      return
    } else if (type === EnumTypeProvider.alert) {
      dispatchOnboardingType(EnumTypeProvider.offer)
      return
    } else if (type === EnumTypeProvider.discussion) {
      dispatchOnboardingType(EnumTypeProvider.alert)
      return
    }
  }

  function handleNextType() {
    if (type === EnumTypeProvider.offer) {
      dispatchOnboardingType(EnumTypeProvider.alert)
      return
    } else if (type === EnumTypeProvider.alert) {
      dispatchOnboardingType(EnumTypeProvider.discussion)
      return
    } else if (type === EnumTypeProvider.discussion) {
      return
    }
  }

  function handleNext() {
    if (step === 2 && valid.isAddress) {
      dispatchOnboarding("next")
    }
    if (step === 2.5 && valid.isCategoryId) {
      dispatchOnboarding("next")
    }
    if (step === 3 && valid.isTitle) {
      dispatchOnboarding("next")
    }
    if (step === 4) {
      dispatchOnboarding("next")
    }
  }

  const disabledNext = useMemo(() => {
    if (step === 2 && valid.isAddress) {
      return false
    }
    if (step === 2.5 && valid.isCategoryId) {
      return false
    }
    if (step === 3 && valid.isTitle) {
      return false
    }
    if (step === 4) {
      return false
    }

    return true
  }, [valid, step])

  return step !== 0 ? (
    <article
      className={styles.container}
      data-visible={visible && step > 0}
      data-option={step > 1 && step <= 5}
      data-finally={step === 5}
      ref={refArticle}
    >
      <section data-finally={step === 5}>
        <div data-content>
          <header>
            <h3>
              {step
                ? type === EnumTypeProvider.offer
                  ? CONTENT_OFFER?.[step]?.title
                  : type === EnumTypeProvider.alert
                  ? CONTENT_ALERT?.[step]?.title
                  : type === EnumTypeProvider.discussion
                  ? CONTENT_DISCUSSION?.[step]?.title
                  : null
                : null}
            </h3>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                handleClose()
              }}
            >
              <img src="/svg/x-close.svg" alt="x" width={16} height={16} />
            </button>
          </header>
          <p>
            {step
              ? type === EnumTypeProvider.offer
                ? CONTENT_OFFER?.[step]?.description
                : type === EnumTypeProvider.alert
                ? CONTENT_ALERT?.[step]?.description
                : type === EnumTypeProvider.discussion
                ? CONTENT_DISCUSSION?.[step]?.description
                : null
              : null}
          </p>
        </div>
        {step === 1 && !!type ? (
          <div data-footer>
            {type !== EnumTypeProvider.offer ? (
              <Button type="button" typeButton="regular-primary" label="Назад" onClick={handlePrevType} />
            ) : null}
            <Button
              type="button"
              typeButton="white"
              label="Далее"
              onClick={handleNextType}
              disabled={type === EnumTypeProvider.discussion}
            />
          </div>
        ) : null}
        {step > 1 && step < 5 ? (
          <div data-footer>
            {step !== 2 ? <Button type="button" typeButton="regular-primary" label="Назад" onClick={handlePrev} /> : null}
            <Button type="button" typeButton="white" label="Далее" onClick={handleNext} disabled={disabledNext} />
          </div>
        ) : null}
      </section>
    </article>
  ) : null
}
