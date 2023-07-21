import Image from "next/image"

import type { TCardBlog } from "./types"

import styles from "./style.module.scss"
import { BadgeServices } from "../../Badge"
import { useId } from "react"

export const CardBlog: TCardBlog = ({ title, photo, services }) => {
  const id = useId()

  return (
    <li className={styles.container}>
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
    </li>
  )
}