import Link from "next/link"

export const dynamic = "force-static"
export const dynamicParams = false

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h2>Упс! Похоже, вы заблудились…</h2>
      <p>
        Извините, но страница, которую вы ищете, не существует. Пожалуйста, проверьте введенный вами URL или вернитесь на&nbsp;
        <Link href="/" prefetch>
          главную
        </Link>
        &nbsp;страницу.
      </p>
    </div>
  )
}
