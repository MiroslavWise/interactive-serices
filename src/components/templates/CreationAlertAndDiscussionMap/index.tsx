"use client"

import { EnumTypeProvider } from "@/types/enum"
import type { TAddCreate } from "@/store/types/useAddCreateModal"
import type { TCreationAlertAndDiscussionMap } from "./types/types"

import { ButtonClose } from "@/components/common"

import { NEW_CREATE_BADGES } from "../NewServicesBanner/constants"
import { openCreateOffers, dispatchAddressOffers, dispatchNewServicesBanner } from "@/store"

import styles from "./styles/style.module.scss"

export const CreationAlertAndDiscussionMap: TCreationAlertAndDiscussionMap = ({ refCreate, isOpen, addressInit, setIsOpen }) => {
  function handleType(value: EnumTypeProvider) {
    if (value) {
      dispatchAddressOffers(addressInit)
      openCreateOffers(value as EnumTypeProvider)
    }
    dispatchNewServicesBanner(false)
  }

  return (
    <div className={styles.container} ref={refCreate} data-visible={isOpen}>
      <ButtonClose onClick={() => setIsOpen(false)} position={{ top: 12, right: 12 }} />
      <h3>Я хочу создать</h3>
      <ul>
        {NEW_CREATE_BADGES.map((item) => (
          <li
            key={`${item.value}-map-absolute`}
            className={styles.containerLiNew}
            onClick={() => handleType(item.value!)}
            data-provider={item.value}
          >
            {item.imageSrc}
            <p>{item.label}</p>
          </li>
        ))}
      </ul>
      {addressInit?.additional ? (
        <h4>
          По адресу: <i>{addressInit?.additional}</i>
        </h4>
      ) : null}
    </div>
  )
}
