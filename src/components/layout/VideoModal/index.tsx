"use client"

import { useEffect } from "react"
import cloudinary from "cloudinary-video-player"

import { ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchCloseVideoStream, useVideoModal } from "@/store"

import styles from "./style.module.scss"

import "cloudinary-video-player/chapters"
import "cloudinary-video-player/playlist"

function VideoModal() {
  const url = useVideoModal(({ url }) => url)
  const type = useVideoModal(({ type }) => type)
  const visible = useVideoModal(({ visible }) => visible)

  useEffect(() => {
    if (url) {
      const player = cloudinary.videoPlayer("player", {
        cloudName: "demo",
        autoplay: true,
        controls: true,
      })
      player.source(url)
    }
  }, [url])

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
        <video id="player" className="w-full h-auto aspect-video object-cover" />
        {/* {!!url && (
          <video controls className="">
            <source src={url} type={type} />
            <source src={url} type="video/webm" />
          </video>
        )} */}
      </section>
    </div>
  )
}

VideoModal.displayName = "VideoModal"
export default VideoModal
