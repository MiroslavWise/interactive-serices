"use client"

import { ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchCloseVideoStream, useVideoModal } from "@/store"

import styles from "./style.module.scss"

function VideoModal() {
  const url = useVideoModal(({ url }) => url)
  const type = useVideoModal(({ type }) => type)
  const visible = useVideoModal(({ visible }) => visible)

  return (
    <div
      className={cx(
        styles.wrapper,
        "fixed inset-0 flex items-center justify-center bg-translucent",
        visible ? `${styles.visible} visible opacity-100` : "-z-10 invisible opacity-0",
      )}
    >
      <ButtonClose onClick={dispatchCloseVideoStream} className="!right-5 !top-5 z-10" />
      <section className="relative w-5/6 md:w-1/2 h-auto aspect-video">
        <video id="my-player" className="w-full h-auto aspect-video object-cover video-js" controls preload="auto" data-setup="{}">
          {url && <source src={url} type={type} />}
        </video>
      </section>
    </div>
  )
}

VideoModal.displayName = "VideoModal"
export default VideoModal
