import type { TListFriends } from "../types/types"

import { MotionUL } from "@/components/common/Motion"
import { ItemListFriend } from "./ItemListFriend"

export const ListFriends: TListFriends = ({ list, type }) => {
    return (
        <ul data-list>
            {list.map((item) => (
                <ItemListFriend
                    key={`${item}-item-friend`}
                    id={item}
                    type={type}
                />
            ))}
            <ItemListFriend key={`${2}-item-friend`} id={2} type={type} />
            <ItemListFriend key={`${3}-item-friend`} id={3} type={type} />
            <ItemListFriend key={`${4}-item-friend`} id={4} type={type} />
            <ItemListFriend key={`${5}-item-friend`} id={5} type={type} />
            <ItemListFriend key={`${6}-item-friend`} id={6} type={type} />
        </ul>
    )
}
