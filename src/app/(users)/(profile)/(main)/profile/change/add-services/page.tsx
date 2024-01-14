import Link from "next/link"

export default function PageAddServices() {
    return (
        <section>
            <header>
                <Link href={{ pathname: "/profile/change" }}>
                    <img src="/svg/arrow-left.svg" alt="<=" width={24} height={24} />
                </Link>
                <h2>Добавить услуги</h2>
            </header>
            <ul>
                
            </ul>
        </section>
    )
}
