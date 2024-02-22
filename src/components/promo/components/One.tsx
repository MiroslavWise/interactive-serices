import Link from "next/link"

export const One = () => {
    return (
        <section data-one>
            <article>
                <div data-title>
                    <img src="/promo/Wordmark.svg" alt="logo" width={371} height={96} />
                    <p>Меняйся. Общайся. Помогай другим</p>
                </div>
                <Link href={{ pathname: "https://sheira.ru" }} target="_blank">
                    <span>Перейти на Sheira</span>
                </Link>
                <div data-footer>
                    <Link href={{}} target="_blank">
                        <img src="/promo/google.svg" alt="google" width={24} height={24} />
                    </Link>
                    <Link href={{}} target="_blank">
                        <img src="/promo/apple.svg" alt="apple" width={18.53} height={22} />
                    </Link>
                    <Link href={{}} target="_blank">
                        <img src="/promo/vk.svg" alt="vk" width={31.47} height={19.05} />
                    </Link>
                    <Link href={{}} target="_blank">
                        <img src="/promo/social-end.svg" alt="end" width={43.75} height={43.75} />
                    </Link>
                </div>
            </article>
        </section>
    )
}
