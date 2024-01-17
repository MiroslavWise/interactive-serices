import Link from "next/link"

import { ChangeForm } from "@/components/profile"

export default function PageChange() {
    return (
        <section data-section-modal>
            <Link data-close href={{ pathname: "/profile" }}>
                <img src="/svg/x-close.svg" alt="X" width={20} height={20} />
            </Link>
            <header>
                <h2>Редактировать профиль</h2>
            </header>
            <ul>
                <ChangeForm />
            </ul>
        </section>
    )
}
