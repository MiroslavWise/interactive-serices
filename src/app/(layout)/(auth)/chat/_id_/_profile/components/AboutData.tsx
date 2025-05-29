import { useRef, useState } from "react"

import { cx } from "@/lib/cx"

function AboutData({ about }: { about: string }) {
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
      className={cx(
        "w-full my-2.5 text-sm font-normal text-text-primary line-clamp-6 text-ellipsis cursor-pointer",
        !state && "line-clamp-none",
      )}
    >
      {about}
      {!state ? (
        <>
          <br />
          <span className="text-text-secondary">скрыть</span>
        </>
      ) : null}
    </p>
  )
}

AboutData.displayName = "AboutData"
export default AboutData
