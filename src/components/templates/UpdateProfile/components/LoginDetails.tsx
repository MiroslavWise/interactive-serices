import dayjs from "dayjs"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import { getUserId } from "@/services"
import { getPhones } from "@/services/phones"
import { dispatchAddEmail, dispatchAddingPhoneNumber, dispatchChangePassword, dispatchDeleteUser, useAuth } from "@/store"

export const LoginDetails = () => {
  const userId = useAuth(({ userId }) => userId)
  const { data } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const { data: dataPhones } = useQuery({
    queryFn: () => getPhones(),
    queryKey: ["phones", { userId: userId }],
    enabled: !!userId,
  })

  console.log("dataPhones: ", dataPhones)

  const email = data?.res?.email
  const create = data?.res?.created
  const phone = data?.res?.phones

  console.log("phone: ", dataPhones)

  function handleUpdatePassword() {
    dispatchChangePassword(true)
  }

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
            <a onClick={() => dispatchAddEmail(true)}>Добавить</a>
          )}
        </fieldset>
        <fieldset>
          <label>Номер телефона</label>
          <input placeholder="Номер не добавлен" type="number" readOnly disabled />
          {phone && phone?.length > 0 ? (
            <a onClick={() => dispatchAddingPhoneNumber(true)}>Добавить</a>
          ) : (
            <span>
              Для изменения номера телефона, напишите в телеграм{" "}
              <a href="https://t.me/sheirainfo" target="_blank">
                @sheirainfo
              </a>
            </span>
          )}
        </fieldset>
        {!!email ? (
          <fieldset>
            <label>Пароль</label>
            <input
              value={create ? `Задан ${dayjs(create)?.format("DD.MM.YYYY")}` : ""}
              placeholder="пароль"
              type="text"
              readOnly
              disabled
            />
            <a onClick={handleUpdatePassword}>Изменить</a>
          </fieldset>
        ) : null}
      </section>
      <div data-delete-account>
        <a onClick={() => dispatchDeleteUser(true)}>Удалить аккаунт</a>
      </div>
    </form>
  )
}
