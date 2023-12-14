import { ImageStatic } from "@/components/common"

import styles from "../styles/screen.module.scss"

export function ScreenTwo() {
    return (
        <div className={styles.two}>
            <div data-background>
                <ImageStatic src="/intro/2/background.avif" alt="background" width={244} height={146} />
                <div data-place data-one>
                    <div data-gray>
                        <img src="/svg/category/77.svg" alt="77" width={18} height={18} />
                    </div>
                </div>
                <div data-place data-two>
                    <div data-gray>
                        <img src="/svg/category/13.svg" alt="13" width={18} height={18} />
                    </div>
                </div>
                <div data-place data-three>
                    <div data-gray>
                        <img src="/svg/category/22.svg" alt="22" width={18} height={18} />
                    </div>
                </div>
                <div data-badge-discussion>
                    <header>
                        <h3>Помощь с техникой</h3>
                        <img src="/svg/x-close-white.svg" alt="x" width={12} height={12} />
                    </header>
                    <article>
                        <section>
                            <div data-title>
                                <ImageStatic src="/intro/2/avatar.png" alt="avatar" width={18} height={18} />
                                <div data-name>
                                    <h5>Кристина Петрова</h5>
                                    <div data-geo>
                                        <img src="/svg/geo-marker.svg" alt="geo" width={4} height={4} />
                                        <span>Санкт-Петербург</span>
                                    </div>
                                </div>
                            </div>
                            <time>25.08.2023</time>
                        </section>
                        <p>У меня сломалась стиральная машина, не включается. В чём может быть причина?</p>
                        <footer>
                            <img src="/svg/bubble-chat.svg" alt="chat" width={16} height={16} />
                        </footer>
                    </article>
                </div>
            </div>
        </div>
    )
}
