"use client"

import { useMemo } from "react"
import Image from "next/image"

import type { TPhotoPreviewModal } from "./types/types"

import { NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { daysAgo, usePush } from "@/helpers"
import { usePhotoOffer } from "@/store/state/usePhotoOffer"

import styles from "./styles/layout.module.scss"

const PhotoPreviewModal: TPhotoPreviewModal = ({}) => {
    const { current, photos, dispatch, visible, author } = usePhotoOffer()
    const { handlePush } = usePush()

    const widthCarousel: number = useMemo(() => {
        return photos.length * 90 + photos.length * 13 - 13 + 40 || 0
    }, [photos])

    function handleClickUser() {
        handlePush(`/user?id=${author?.idUser!}`)
        dispatch({ visible: false, photos: null })
    }

    function handlePrev() {
        dispatch({ payload: "prev" })
    }

    function handleNext() {
        dispatch({ payload: "next" })
    }

    return (
        <main className={cx(styles.wrapper, visible && styles.active)}>
            <section>
                <div data-dark-header />
                <div
                    data-close
                    onClick={() => {
                        dispatch({ visible: false, photos: null })
                    }}
                >
                    <Image
                        src="/svg/x-close.svg"
                        alt="x-close"
                        width={16}
                        height={16}
                    />
                </div>
                <div data-left onClick={handlePrev}>
                    <Image
                        src="/svg/arrow-left.svg"
                        alt="arrow-left"
                        width={20}
                        height={20}
                    />
                </div>
                <div data-right onClick={handleNext}>
                    <Image
                        src="/svg/arrow-right.svg"
                        alt="arrow-right"
                        width={20}
                        height={20}
                    />
                </div>
                <header>
                    <div data-title>
                        <div data-author onClick={handleClickUser}>
                            <NextImageMotion
                                src={author?.urlPhoto!}
                                alt="avatar"
                                width={400}
                                height={400}
                            />
                            <h2>{author?.name}</h2>
                        </div>
                        <p>{daysAgo(author?.time!)}</p>
                    </div>
                    <h3>{author?.title!}</h3>
                </header>
                {current ? (
                    <NextImageMotion
                        src={current?.url}
                        alt="offer-image"
                        width={800}
                        height={800}
                    />
                ) : null}
                <footer>
                    <ul style={{ width: widthCarousel }}>
                        {photos
                            ? photos.map((item, index) => (
                                  <li
                                      key={item.id + item.url}
                                      data-active={index === current?.index}
                                  >
                                      <NextImageMotion
                                          onClick={() => {
                                              dispatch({
                                                  current: item,
                                              })
                                          }}
                                          src={item?.url}
                                          alt="offer-image"
                                          width={800}
                                          height={800}
                                      />
                                  </li>
                              ))
                            : null}
                    </ul>
                </footer>
            </section>
        </main>
    )
}

export default PhotoPreviewModal
