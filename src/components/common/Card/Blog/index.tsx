import { isMobile } from "react-device-detect"

import type { TCardBlog } from "./types"

// import { BadgeServices } from "@/components/common/Badge"
import { MotionLI } from "@/components/common/Motion"
import { ImageStatic } from "@/components/common/Image"

import styles from "./style.module.scss"

export const CardBlog: TCardBlog = ({ title, photo, services }) => {
    return (
        <MotionLI classNames={[styles.container, isMobile && styles.mobile]}>
            <div className={styles.photo}>
                <ImageStatic src={photo} alt="title" width={300} height={216} />
            </div>
            <section>
                {/* {isMobile ? (
                    <ul>
                        {services.map((item, index) => (
                            <BadgeServices
                                key={id + index}
                                photo={item.photo}
                                label={item.label}
                            />
                        ))}
                    </ul>
                ) : null} */}
                <h4>{title}</h4>
            </section>
        </MotionLI>
    )
}
