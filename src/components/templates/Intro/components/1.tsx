import { ImageStatic } from "@/components/common"

import styles from "../styles/screen.module.scss"

export function ScreenOne() {
    return (
        <div className={styles.one}>
            <div data-card={1}>
                <article>
                    <div data-header>
                        <ImageStatic src="/intro/1/first-avatar.png" alt="avatar" width={32} height={32} />
                        <div data-names>
                            <h4>Екатерина Смирнова</h4>
                            <div data-geo>
                                <img src="/svg/geo-marker.svg" alt="geo" width={10} height={10} />
                                <span>Санкт-Петербург</span>
                            </div>
                        </div>
                        <div data-new>
                            <span>New</span>
                        </div>
                    </div>
                    <div data-categories>
                        <div data-category>
                            <img src="/svg/category/23.svg" alt="23" width={18} height={18} />
                            <span>Животные</span>
                        </div>
                        <img src="/svg/repeat.svg" alt="repeat" width={16} height={16} />
                        <div data-category>
                            <img src="/svg/category/54.svg" alt="54" width={18} height={18} />
                            <span>Домашние дела</span>
                        </div>
                    </div>
                </article>
                <footer>
                    <div data-time>
                        <img src="/svg/clock-fast-forward.svg" alt="clock" width={12} height={12} />
                        <time>5 мин. назад</time>
                    </div>
                    <div data-details>
                        <span>посмотреть детали</span>
                    </div>
                </footer>
            </div>
            <div data-card={2}>
                <article>
                    <div data-header>
                        <ImageStatic src="/intro/1/second-avatar.png" alt="avatar" width={32} height={32} />
                        <div data-names>
                            <h4>Мария Миронова</h4>
                            <div data-geo>
                                <img src="/svg/geo-marker.svg" alt="geo" width={10} height={10} />
                                <span>Санкт-Петербург</span>
                            </div>
                        </div>
                        <div data-new>
                            <span>New</span>
                        </div>
                    </div>
                    <div data-categories>
                        <div data-category>
                            <img src="/svg/category/23.svg" alt="23" width={18} height={18} />
                            <span>Животные</span>
                        </div>
                        <img src="/svg/repeat.svg" alt="repeat" width={16} height={16} />
                        <div data-category>
                            <img src="/svg/category/54.svg" alt="54" width={18} height={18} />
                            <span>Домашние дела</span>
                        </div>
                    </div>
                </article>
                <footer>
                    <div data-time>
                        <img src="/svg/clock-fast-forward.svg" alt="clock" width={12} height={12} />
                        <time>9 мин. назад</time>
                    </div>
                    <div data-details>
                        <span>посмотреть детали</span>
                    </div>
                </footer>
            </div>
        </div>
    )
}
