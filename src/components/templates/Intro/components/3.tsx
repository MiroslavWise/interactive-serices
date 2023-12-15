import { ImageStatic } from "@/components/common"

import styles from "../styles/screen.module.scss"

export function ScreenThree() {
    return (
        <div className={styles.three}>
            <div data-card>
                <header>
                    <div data-avatars>
                        <ImageStatic src="/intro/4/1.png" alt="avatar" width={26} height={26} data-img={0} />
                        <ImageStatic src="/intro/4/3.png" alt="avatar" width={26} height={26} data-img={1} />
                        <ImageStatic src="/intro/4/2.png" alt="avatar" width={26} height={26} data-img={2} />
                    </div>
                    <time>25.08.2023</time>
                </header>
                <article>
                    <p>Надо решить вопрос парковки на тротуаре. Соседи, кто готов участвовать в решении проблемы?</p>
                </article>
                <footer>
                    <div data-button>
                        <p>125 комментариев</p>
                        <img src="/svg/chevron-up.svg" alt="chevron-up" width={14} height={14} />
                    </div>
                    <div data-circle>
                        <img src="/svg/thumbs-up.svg" alt="thumbs-up" width={14} height={14} />
                        <span>112</span>
                    </div>
                </footer>
            </div>
            <div data-mini-card={1}>
                <header>
                    <div data-personal>
                        <ImageStatic src="/intro/4/0.png" alt="avatar" width={23} height={23} data-img={0} />
                        <section>
                            <h6>Ирина Сидорова</h6>
                            <div>
                                <img src="/public/svg/star.svg" alt="star" width={4} height={4} />
                                <span>4.5</span>
                            </div>
                        </section>
                    </div>
                    <time>сегодня</time>
                </header>
                <article>
                    <p>Да, давайте!</p>
                </article>
            </div>
            <div data-mini-card={2}>
                <header>
                    <div data-personal>
                        <ImageStatic src="/intro/4/3.png" alt="avatar" width={23} height={23} data-img={0} />
                        <section>
                            <h6>Вячеслав Иванов</h6>
                            <div>
                                <img src="/public/svg/star.svg" alt="star" width={4} height={4} />
                                <span>4.5</span>
                            </div>
                        </section>
                    </div>
                    <time>сегодня</time>
                </header>
                <article>
                    <p>Участвую.</p>
                </article>
            </div>
        </div>
    )
}
