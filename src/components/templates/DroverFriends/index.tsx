"use client"

import { useState } from "react"

import type { TTypeFriends } from "@/store/types/createDroverFriends"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { ListFriends } from "./components/ListFriends"
import { SearchInput } from "@/components/common/Inputs"
import { ButtonClose } from "@/components/common/Buttons"
import { Segments } from "@/components/common/Segments"

import { useResize } from "@/helpers"
import { useDroverFriends, useAuth } from "@/store"
import { SEGMENT_FRIENDS } from "./constants/segments"
import { useReloadFriends } from "./hooks/useReloadFriends"

import styles from "./styles/style.module.scss"

export function DroverFriends() {
  const { isTablet } = useResize()
  const userId = useAuth(({ userId }) => userId)
  const visibleFriends = useDroverFriends(({ visibleFriends }) => visibleFriends)
  const dispatchFriends = useDroverFriends(({ dispatchFriends }) => dispatchFriends)
  const [segment, setSegment] = useState<ISegmentValues<TTypeFriends>>(SEGMENT_FRIENDS[0])

  const { data } = useReloadFriends({
    enabled: !!visibleFriends && !!userId,
    type: segment.value!,
  })
  const list = data?.res || []
  const [search, setSearch] = useState("")

  function handleClose() {
    dispatchFriends({ visible: false })
  }

  return (
    <div className={styles.wrapper}>
      <section>
        {!isTablet && (
          <ButtonClose
            onClick={handleClose}
            position={{
              top: 12,
              left: 12,
            }}
          />
        )}
        <article>
          <header />
          {isTablet ? (
            <div data-close-segment>
              <Segments type="primary" VALUES={SEGMENT_FRIENDS} active={segment} setActive={setSegment} isBorder />
              <ButtonClose
                onClick={handleClose}
                position={{
                  top: 12,
                  left: 12,
                }}
              />
            </div>
          ) : (
            <Segments type="primary" VALUES={SEGMENT_FRIENDS} active={segment} setActive={setSegment} isBorder />
          )}
          <div data-search-block>
            <SearchInput value={search} setValue={setSearch} placeholder="Поиск пользователя по имени" />
          </div>
          <ListFriends list={list} type={segment.value} />
        </article>
      </section>
    </div>
  )
}
