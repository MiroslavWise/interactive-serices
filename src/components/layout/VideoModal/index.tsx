"use client"

import { useEffect } from "react"

import { ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchCloseVideoStream, useVideoModal } from "@/store"

import styles from "./style.module.scss"

function VideoModal() {
  const url = useVideoModal(({ url }) => url)
  const type = useVideoModal(({ type }) => type)
  const visible = useVideoModal(({ visible }) => visible)

  useEffect(() => {
    function keyDown(e: KeyboardEvent) {
      if (e.code == "Escape" || e.keyCode === 27) {
        dispatchCloseVideoStream()
      }
    }

    document.addEventListener("keydown", keyDown, false)
    window.addEventListener("popstate", dispatchCloseVideoStream)

    return () => {
      document.removeEventListener("keydown", keyDown)
      window.removeEventListener("popstate", dispatchCloseVideoStream)
    }
  }, [])

  return (
    <div
      className={cx(
        styles.wrapper,
        "fixed inset-0 flex items-center justify-center bg-translucent",
        visible ? cx(styles.visible, "visible opacity-100") : "-z-10 invisible opacity-0",
      )}
    >
      <ButtonClose onClick={dispatchCloseVideoStream} className="!right-5 !top-5 z-10" />
      <section className="relative w-5/6 md:w-1/2 h-auto aspect-video">
        {url && (
          <video id="my-player" className="w-full h-auto object-cover" controls preload="auto">
            <source src={url} type={type} />
          </video>
        )}
      </section>
    </div>
  )
}

VideoModal.displayName = "VideoModal"
export default VideoModal
