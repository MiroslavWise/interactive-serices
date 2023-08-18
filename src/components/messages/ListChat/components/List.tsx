import { Fragment } from "react"

import type { TList } from "./types/types"

import { ItemListChat } from "./ItemListChat"
import { Divider } from "@/components/common/Divider"

import styles from "./styles/style.module.scss"

export const List: TList = ({ items }) => {

  return (
    <ul className={styles.containerList}>
      {
        items?.map((item, index) => (
          <Fragment
            key={`${item.id}-${index}-item-chat`}
          >
            <ItemListChat
              item={item}
            />
            {index < items.length - 1 ? <Divider /> : null}
          </Fragment>
        ))
      }
    </ul>
  )
}