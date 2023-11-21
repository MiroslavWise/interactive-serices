import type { TListFriends } from "../types/types"

import { ItemListFriend } from "./ItemListFriend"

export const ListFriends: TListFriends = ({ list, type }) => {
    return (
        <ul data-list>
            {list.map((item) => (
                <ItemListFriend
                    key={`${item.id}-item-friend`}
                    id={item.id}
                    type={type}
                />
            ))}
        </ul>
    )
}
