import dayjs from "dayjs"
import { useQuery } from "@tanstack/react-query"

import { getUserId } from "@/services"
import { dispatchAddEmail, dispatchAddingPhoneNumber, dispatchChangePassword, dispatchDeleteUser, useAuth } from "@/store"

export const LoginDetails = () => {
  const userId = useAuth(({ userId }) => userId)
  const { data } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const email = data?.res?.email
  const create = data?.res?.created
  const phone = data?.res?.phones

  const number = phone && phone?.length > 0 ? phone[0]?.phone : null

  function handleUpdatePassword() {
    dispatchChangePassword(true)
  }

  return (
    <form>
      <section data-personal>
        <fieldset>
          <label>Электронная почта</label>
          <input value={email! && !email?.includes("no-login:") ? email : ""} readOnly disabled type="email" />
          {email && !email?.includes("no-login:") ? (
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
          <input
            value={!!number ? (number[0] !== "8" ? `+${number}` : number) : ""}
            placeholder="Номер не добавлен"
            type="text"
            readOnly
            disabled
          />
          {number ? (
            <span>
              Для изменения номера телефона, напишите в телеграм{" "}
              <a href="https://t.me/sheirainfo" target="_blank">
                @sheirainfo
              </a>
            </span>
          ) : (
            <a onClick={() => dispatchAddingPhoneNumber(true)}>Добавить</a>
          )}
        </fieldset>
        {!!email && !email?.includes("no-login:") ? (
          <fieldset>
            <label>Пароль</label>
            <input value="********" placeholder="пароль" type="text" readOnly disabled />
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
