import Link from "next/link"

export const dynamic = "force-static"
export const dynamicParams = false

export default () => (
  <div className="w-full h-full gap-12 flex flex-col items-center justify-center px-5 py-5">
    <h2 className="text-text-accent text-center font-semibold text-4xl">Упс! Похоже, вы заблудились…</h2>
    <p className="text-text-primary font-medium text-base">
      Извините, но страница, которую вы ищете, не существует. Пожалуйста, проверьте введенный вами URL или вернитесь на&nbsp;
      <Link href="/" prefetch className="text-text-accent cursor-pointer">
        главную
      </Link>
      &nbsp;страницу.
    </p>
  </div>
)
