import { useId } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import type { TCardBlog } from "./types"

import { BadgeServices } from "@/components/common/Badge"

import { motionItemOnOpacityY } from "@/lib/motion"

import styles from "./style.module.scss"

export const CardBlog: TCardBlog = ({ title, photo, services }) => {
  const id = useId()

  return (
    <motion.li
      className={styles.container}
      variants={motionItemOnOpacityY}
    >
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
    </motion.li>
  )
}