import { useId } from "react"
import Image from "next/image"

import type { TCardBlog } from "./types"

import { BadgeServices } from "@/components/common/Badge"
import { MotionLI } from "@/components/common/Motion"

import styles from "./style.module.scss"

export const CardBlog: TCardBlog = ({ title, photo, services }) => {
  const id = useId()

  return (
    <MotionLI classNames={[styles.container]}>
      <div className={styles.photo}>
        <Image
          src={photo}
          alt="title"
          width={150}
          height={108}
        />
      </div>
      <section>
        <h4>{title}</h4>
        <ul>
          {
            services.map((item, index) => (
              <BadgeServices
                key={id + index}
                photo={item.photo}
                label={item.label}
              />
            ))
          }
        </ul>
      </section>
    </MotionLI>
  )
}