import type { TListFriends } from "../types/types"

import { MotionUL } from "@/components/common/Motion"
import { ItemListFriend } from "./ItemListFriend"

export const ListFriends: TListFriends = ({ list, type }) => {
    return (
        <MotionUL data={{ "data-list": true }}>
            {list.map((item) => (
                <ItemListFriend
                    key={`${item.id}-item-friend`}
                    id={item.id}
                    type={type}
                />
            ))}
        </MotionUL>
    )
}
