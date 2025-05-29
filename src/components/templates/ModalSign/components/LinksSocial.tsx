import Link from "next/link"

import { LinkItem } from "./LinkItem"

import { ITEMS_SOCIAL_LINK } from "../constants/social"

export function LinksSocial() {
  return (
    <article className="w-full flex flex-col items-center gap-5 max-md:max-w-full">
      <section className="w-full flex flex-col items-center gap-3 h-fit rounded-2 bg-grey-field py-5 px-[1.875rem]">
        <span className="text-text-secondary text-center text-sm font-medium">Или продолжить через:</span>
        <div className="w-full flex flex-row items-center justify-center gap-2.5">
          {ITEMS_SOCIAL_LINK.map(({ value, srcNotWorking, srcWorking, isWorkingLink, path }) => (
            <LinkItem key={value} src={isWorkingLink ? srcWorking : srcNotWorking} path={path} isActive={isWorkingLink} />
          ))}
        </div>
      </section>
      <span className="text-text-secondary text-sm text-center font-medium">
        Создавая аккаунт, вы соглашаетесь
        <br />
        с&nbsp;
        <Link className="text-text-accent" href={{ pathname: "/legal/terms" }} target="_blank">
          Правилами пользования
        </Link>
        &nbsp;и&nbsp;
        <Link className="text-text-accent" href={{ pathname: "/legal/privacy-policy" }} target="_blank">
          Политикой конфиденциальности
        </Link>
      </span>
    </article>
  )
}
