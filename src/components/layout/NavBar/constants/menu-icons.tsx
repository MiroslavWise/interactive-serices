import { type ReactNode } from "react"

type TTypeMenu = "map" | "message" | "offers" | "profile" | "notifications"

export const MENU_ICONS: Record<TTypeMenu, ReactNode> = {
    map: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g id="component">
                <g id="elements">
                    <path
                        id="Vector"
                        d="M22.75 10V9.21749C22.75 7.27787 22.75 6.30807 22.1642 5.7055C21.5784 5.10294 20.6356 5.10294 18.75 5.10294H16.6714C15.754 5.10294 15.7464 5.10116 14.9215 4.68834L11.5899 3.02114C10.1988 2.32504 9.50332 1.97699 8.76238 2.00118C8.02143 2.02537 7.34877 2.41808 6.00345 3.20351L4.77558 3.92037C3.78739 4.49729 3.29329 4.78576 3.02164 5.26564C2.75 5.74553 2.75 6.32993 2.75 7.49873V15.7157C2.75 17.2514 2.75 18.0193 3.09226 18.4467C3.32001 18.731 3.63916 18.9222 3.992 18.9856C4.52226 19.0808 5.17148 18.7018 6.46987 17.9437C7.35156 17.429 8.20011 16.8944 9.25487 17.0394C10.1387 17.1608 10.96 17.7185 11.75 18.1138"
                        stroke="var(--element-grey)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path id="Vector 4644" d="M8.75 2L8.75 17" stroke="var(--element-grey)" stroke-width="1.5" stroke-linejoin="round" />
                    <path id="Vector 4645" d="M15.75 5V9.5" stroke="var(--element-grey)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        id="Vector_2"
                        d="M19.0583 21.6835C18.8415 21.8865 18.5517 22 18.2501 22C17.9485 22 17.6587 21.8865 17.4419 21.6835C15.4563 19.813 12.7955 17.7235 14.0931 14.6898C14.7947 13.0496 16.4789 12 18.2501 12C20.0213 12 21.7055 13.0496 22.4071 14.6898C23.7031 17.7196 21.0488 19.8194 19.0583 21.6835Z"
                        stroke="var(--element-grey)"
                        stroke-width="1.5"
                    />
                    <path id="Vector_3" d="M18.25 16.5H18.259" stroke="var(--element-grey)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </g>
        </svg>
    ),
    offers: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g id="component">
                <g id="elements">
                    <path
                        id="Vector 6755"
                        d="M20.75 5.5H9.75C6.03672 5.5 3.25 8.18503 3.25 12"
                        stroke="var(--element-grey)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector 6756"
                        d="M3.75 18.5H14.75C18.4633 18.5 21.25 15.815 21.25 12"
                        stroke="var(--element-grey)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector"
                        d="M18.75 3C18.75 3 21.25 4.84122 21.25 5.50002C21.25 6.15882 18.75 8 18.75 8"
                        stroke="var(--element-grey)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector_2"
                        d="M5.74998 16C5.74998 16 3.25001 17.8412 3.25 18.5C3.24999 19.1588 5.75 21 5.75 21"
                        stroke="var(--element-grey)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
            </g>
        </svg>
    ),
    message: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g id="component">
                <g id="elements">
                    <path
                        id="Vector"
                        d="M22 11.5667C22 16.8499 17.5222 21.1334 12 21.1334C11.3507 21.1343 10.7032 21.0742 10.0654 20.9545C9.60633 20.8682 9.37678 20.8251 9.21653 20.8496C9.05627 20.8741 8.82918 20.9948 8.37499 21.2364C7.09014 21.9197 5.59195 22.161 4.15111 21.893C4.69874 21.2194 5.07275 20.4112 5.23778 19.5448C5.33778 19.0148 5.09 18.5 4.71889 18.1231C3.03333 16.4115 2 14.1051 2 11.5667C2 6.28357 6.47778 2 12 2C17.5222 2 22 6.28357 22 11.5667Z"
                        stroke="var(--element-grey)"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector_2"
                        d="M11.9955 12H12.0045M15.991 12H16M8 12H8.00897"
                        stroke="var(--element-grey)"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
            </g>
        </svg>
    ),
    profile: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <g id="component">
                <g id="elements">
                    <path
                        d="M11.5 21H5.59087C4.04549 21 2.81631 20.248 1.71266 19.1966C-0.546635 17.0441 3.1628 15.324 4.57757 14.4816C6.827 13.1422 9.48651 12.7109 12 13.1878"
                        stroke="var(--element-grey)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M14.5 5.5C14.5 7.98528 12.4853 10 10 10C7.51472 10 5.5 7.98528 5.5 5.5C5.5 3.01472 7.51472 1 10 1C12.4853 1 14.5 3.01472 14.5 5.5Z"
                        stroke="var(--element-grey)"
                        stroke-width="1.5"
                    />
                    <path
                        d="M17.6911 13.5777L18.395 14.9972C18.491 15.1947 18.7469 15.3843 18.9629 15.4206L20.2388 15.6343C21.0547 15.7714 21.2467 16.3682 20.6587 16.957L19.6668 17.9571C19.4989 18.1265 19.4069 18.4531 19.4589 18.687L19.7428 19.925C19.9668 20.9049 19.4509 21.284 18.591 20.7718L17.3951 20.0581C17.1791 19.929 16.8232 19.929 16.6032 20.0581L15.4073 20.7718C14.5514 21.284 14.0315 20.9009 14.2554 19.925L14.5394 18.687C14.5914 18.4531 14.4994 18.1265 14.3314 17.9571L13.3395 16.957C12.7556 16.3682 12.9436 15.7714 13.7595 15.6343L15.0353 15.4206C15.2473 15.3843 15.5033 15.1947 15.5993 14.9972L16.3032 13.5777C16.6872 12.8074 17.3111 12.8074 17.6911 13.5777Z"
                        stroke="var(--element-grey)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
            </g>
        </svg>
    ),
    notifications: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="component">
                <g id="elements">
                    <path
                        id="Icon"
                        d="M8.5747 19.2502C9.22107 19.8207 10.0701 20.1668 11 20.1668C11.9299 20.1668 12.779 19.8207 13.4254 19.2502M16.5 7.3335C16.5 5.87481 15.9206 4.47586 14.8891 3.44441C13.8577 2.41296 12.4587 1.8335 11 1.8335C9.54135 1.8335 8.1424 2.41296 7.11095 3.44441C6.0795 4.47586 5.50004 5.87481 5.50004 7.3335C5.50004 10.1662 4.78547 12.1056 3.98723 13.3885C3.3139 14.4705 2.97724 15.0116 2.98959 15.1625C3.00325 15.3296 3.03866 15.3934 3.17333 15.4933C3.29496 15.5835 3.84325 15.5835 4.93982 15.5835H17.0603C18.1568 15.5835 18.7051 15.5835 18.8267 15.4933C18.9614 15.3934 18.9968 15.3296 19.0105 15.1625C19.0228 15.0116 18.6862 14.4705 18.0128 13.3885C17.2146 12.1056 16.5 10.1662 16.5 7.3335Z"
                        stroke="var(--element-grey)"
                        stroke-width="1.83333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
            </g>
        </svg>
    ),
}
