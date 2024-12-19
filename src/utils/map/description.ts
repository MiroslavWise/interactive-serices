import { fromNow } from "@/helpers"

export const description = (title: string, date: string | Date) =>
  `
    <div class="div-alert-text">
      <section>
        <p>${title ?? ""}</p>
        <time>${fromNow(date ?? "")}</time>
      </section>
    </div>
  `
