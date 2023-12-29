import { useState } from "react"

import { serviceNotifications } from "@/services/notifications"
import { useOutsideClickEvent } from "@/helpers"

export const ButtonsDots = (props: { id: number; refetch: () => Promise<any> }) => {
    const { id, refetch } = props ?? {}
    const [loading, setLoading] = useState(false)
    const [active, setActive, ref] = useOutsideClickEvent()

    function handleDelete() {
        if (!loading) {
            setLoading(true)
            serviceNotifications.patch({ enabled: false }, id).then((response) => {
                if (response.ok) {
                    refetch().then(() => {
                        setLoading(false)
                    })
                }
            })
        }
    }

    return (
        <>
            <button
                data-dots
                data-active={active}
                onClick={(event) => {
                    event.stopPropagation()
                    setActive((_) => !_)
                }}
                ref={ref}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="icon_16">
                        <path
                            id="Union"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.5 8C4.5 8.82843 3.82843 9.5 3 9.5C2.17157 9.5 1.5 8.82843 1.5 8C1.5 7.17157 2.17157 6.5 3 6.5C3.82843 6.5 4.5 7.17157 4.5 8ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM13 9.5C13.8284 9.5 14.5 8.82843 14.5 8C14.5 7.17157 13.8284 6.5 13 6.5C12.1716 6.5 11.5 7.17157 11.5 8C11.5 8.82843 12.1716 9.5 13 9.5Z"
                            fill="var(--gray-500)"
                        />
                    </g>
                </svg>
            </button>
            <div data-popup={active}>
                <a
                    onClick={(event) => {
                        event.stopPropagation()
                        handleDelete()
                    }}
                >
                    <span>Удалить</span>
                    <img
                        src={loading ? "/svg/spinner.svg" : "/svg/trash-black.svg"}
                        data-loading-image={loading}
                        alt="trash"
                        width={16}
                        height={16}
                    />
                </a>
            </div>
        </>
    )
}
