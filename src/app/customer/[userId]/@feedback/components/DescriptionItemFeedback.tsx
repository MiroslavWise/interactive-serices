"use client"

import { useRef, useState } from "react"

function DescriptionItemFeedback({ message }: { message: string }) {
  const [state, setState] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  function openClose() {
    if (ref.current) {
      if (ref.current.scrollHeight > ref.current.clientHeight) {
        setState(false)
      } else {
        setState(true)
      }
    }
  }

  return (
    <p
      ref={ref}
      onClick={openClose}
      className={`text-text-primary text-sm font-normal ${state ? "line-clamp-4 text-ellipsis" : "line-clamp-none"}`}
    >
      {message}
      {!state ? (
        <>
          <br />
          <span className="text-text-secondary">скрыть</span>
        </>
      ) : null}
    </p>
  )
}

DescriptionItemFeedback.displayName = "DescriptionItemFeedback"
export default DescriptionItemFeedback
