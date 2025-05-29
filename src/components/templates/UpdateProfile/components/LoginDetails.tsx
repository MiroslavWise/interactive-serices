import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useQuery } from "@tanstack/react-query"

import { getUserId } from "@/services"
import { dispatchAddEmail, dispatchAddingPhoneNumber, dispatchChangePassword, dispatchModal, EModalData, useAuth } from "@/store"

export const LoginDetails = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { data } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId! }],
    enabled: !!userId,
  })

  const email = data?.data?.email
  const phone = data?.data?.phones

  const number = phone && phone?.length > 0 ? phone[0]?.phone : null

  function handleUpdatePassword() {
    dispatchChangePassword(true)
  }

  return (
    <form data-test="form-login-details">
      <section data-personal>
        <fieldset data-test="fieldset-login-details-email">
          <label>Электронная почта</label>
          <input
            value={email! && !email?.includes("no-login:") ? email : ""}
            readOnly
            disabled
            type="email"
            data-test="input-login-details-email"
          />
          {email && !email?.includes("no-login:") ? (
            <span>
              Для изменения электронной почты, напишите в телеграм&nbsp;
              <a href="https://t.me/sheirainfo" target="_blank">
                @sheirainfo
              </a>
            </span>
          ) : (
            <a onClick={() => dispatchAddEmail(true)}>Добавить</a>
          )}
        </fieldset>
        <fieldset data-test="fieldset-login-details-phone">
          <label>Номер телефона</label>
          <input
            value={!!number ? (!["8", "+", 8].includes(number[0]) ? `+${number}` : number) : ""}
            placeholder="Номер не добавлен"
            type="text"
            readOnly
            disabled
            data-test="input-login-details-phone"
          />
          {number ? (
            <span>
              Для изменения номера телефона, напишите в телеграм&nbsp;
              <a href="https://t.me/sheirainfo" target="_blank">
                @sheirainfo
              </a>
            </span>
          ) : (
            <a onClick={() => dispatchAddingPhoneNumber(true)}>Добавить</a>
          )}
        </fieldset>
        {!!email && !email?.includes("no-login:") ? (
          <fieldset data-test="fieldset-login-details-password">
            <label>Пароль</label>
            <input value="********" placeholder="пароль" type="text" readOnly disabled data-test="input-login-details-password" />
            <a onClick={handleUpdatePassword} data-test="a-login-details-on-modal-update-password">
              Изменить
            </a>
          </fieldset>
        ) : null}
      </section>
      <div data-delete-account>
        <span>На Sheira c {format((data?.data?.created as Date) || new Date(), "do MMMM yyyy", { locale: ru })}</span>
        <a
          onClick={() => {
            dispatchModal(EModalData.DeleteUser)
          }}
        >
          Удалить аккаунт
        </a>
      </div>
    </form>
  )
}
