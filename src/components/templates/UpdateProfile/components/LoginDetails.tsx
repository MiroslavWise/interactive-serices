import { useForm } from "react-hook-form"
import { ButtonsFooter } from "./ButtonsFooter"
import { useQuery } from "@tanstack/react-query"
import { dispatchDeleteUser, useAuth } from "@/store"
import { getUserId } from "@/services"
import dayjs from "dayjs"

export const LoginDetails = () => {
  const userId = useAuth(({ userId }) => userId)
  const { data } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })
  const { register, watch, setValue, setError } = useForm({})

  const email = data?.res?.email
  const create = data?.res?.created
  const phone = data?.res?.phones

  return (
    <form>
      <section data-personal>
        <fieldset>
          <label>Электронная почта</label>
          <input value={email! || ""} readOnly disabled type="email" />
          {email ? (
            <span>
              Для изменения электронной почты, напишите в телеграм{" "}
              <a href="https://t.me/sheirainfo" target="_blank">
                @sheirainfo
              </a>
            </span>
          ) : (
            <a>Добавить</a>
          )}
        </fieldset>
        <fieldset>
          <label>Номер телефона</label>
          <input placeholder="Номер не добавлен" type="number" />
          {phone && phone?.length > 0 ? <a>Добавить</a> : null}
        </fieldset>
        <fieldset>
          <label>Пароль</label>
          <input value={create ? `Задан ${dayjs(create)?.format("DD.MM.YYYY")}` : ""} placeholder="пароль" type="text" readOnly disabled />
          <a>Изменить</a>
        </fieldset>
      </section>
      <div data-delete-account>
        <a onClick={() => dispatchDeleteUser(true)}>Удалить аккаунт</a>
      </div>
    </form>
  )
}
