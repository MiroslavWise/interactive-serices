import Link from "next/link"

import { LinkItem } from "./LinkItem"

import { ITEMS_SOCIAL_LINK } from "../constants/social"

export function LinksSocial() {
  return (
    <article className="__links_social__">
      <section>
        <span>Или продолжить через:</span>
        <div className="__items__">
          {ITEMS_SOCIAL_LINK.map(({ value, srcNotWorking, srcWorking, isWorkingLink, path }) => (
            <LinkItem key={value} src={isWorkingLink ? srcWorking : srcNotWorking} path={path} isActive={isWorkingLink} />
          ))}
        </div>
      </section>
      <span>
        Создавая аккаунт, вы соглашаетесь
        <br />
        с&nbsp;
        <Link href={{ pathname: "/legal/terms" }} target="_blank">
          Правилами пользования
        </Link>
      </span>
    </article>
  )
}
