import { Button } from "@/components/common"
import env from "@/config/environment"
import { useToast } from "@/helpers/hooks/useToast"

interface IProps {
  id: number
  username?: string
}

function NoFriends({ id, username }: IProps) {
  const { onSimpleMessage } = useToast()

  return (
    <article className="w-full px-5 flex flex-col items-center py-20">
      <div className="w-full max-w-80 flex flex-col gap-5 items-center">
        <article className="w-full flex flex-col items-center gap-2.5">
          <div className="w-14 h-14 rounded-full flex items-center justify-center p-4 bg-grey-field">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.99707 7.05018C5.99707 8.66588 6.96649 10.0602 8.35643 10.6755C8.29445 10.3568 8.26347 10.0248 8.26347 9.69284C8.26347 7.02362 10.3041 4.74837 12.8848 4.36769C12.1588 3.57976 11.1186 3.08398 9.96327 3.08398C7.77212 3.08398 5.99707 4.85904 5.99707 7.05018ZM10.6499 14.1485C8.15334 14.9807 6.12155 16.8354 5.05032 19.2346H2.97426C2.50062 19.2346 2.12436 18.8584 2.21732 18.2918C2.62899 14.8567 5.16541 12.0547 8.53402 11.373C8.91471 12.5062 9.67165 13.4801 10.6499 14.1485ZM17.8129 9.69211C17.8129 7.43138 15.9632 5.55849 13.7071 5.52593L13.7042 5.52591L13.6911 5.52586L13.6885 5.52579L13.6713 5.52148H13.6467C11.3658 5.52148 9.48047 7.30777 9.48047 9.68768C9.48047 10.1756 9.56414 10.6411 9.72243 11.0788C9.74613 11.1452 9.77411 11.2151 9.80173 11.2796C10.183 12.1902 10.8794 12.9423 11.7483 13.3931C12.3204 13.6907 12.9672 13.8583 13.6467 13.8583C15.9306 13.8583 17.8129 11.976 17.8129 9.69211ZM10.5522 15.4758C8.79649 16.1881 7.34474 17.4856 6.44181 19.1327C5.96129 20.0121 5.63901 20.9915 5.51604 22.0341C5.46257 22.3674 5.54512 22.6626 5.72845 22.876C5.9112 23.0888 6.18092 23.2046 6.4711 23.2046H20.8264C21.4288 23.2046 21.8918 22.6158 21.7811 22.0309C21.2925 17.97 17.8114 14.7793 13.651 14.7793C12.977 14.7793 12.2937 14.8737 11.7044 15.0706C11.6119 15.0944 11.5284 15.1272 11.4522 15.1699C11.1416 15.2581 10.8454 15.3558 10.5522 15.4758Z"
                fill="url(#paint0_linear_5638_165758)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_5638_165758"
                  x1="2.20312"
                  y1="3.08398"
                  x2="25.5019"
                  y2="9.28371"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#8B89F5" />
                  <stop offset="1" stop-color="#625FF9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3 className="text-text-primary text-center text-lg font-semibold">Нет друзей</h3>
          <p className="text-text-primary text-sm text-center font-normal">Вы можете пригласить своих знакомых и добавить их в друзья</p>
        </article>
        <Button
          type="button"
          typeButton="fill-primary"
          label="Пригласить друзей в Sheira"
          className="max-w-min px-5 py-2.5"
          onClick={() => {
            const linkUser = `/user/${id}`
            const url = `${env.server.host}${linkUser}`
            if (!!window.navigator.share!) {
              navigator.share({
                title: `Приглашаю присоединиться к Sheira, где мы вместе сможем помогать другим людям`,
                text: `Приглашаю присоединиться к Sheira, где мы вместе сможем помогать другим людям`,
                url: url,
              })
            } else {
              navigator.clipboard.writeText(`
              Приглашаю присоединиться к Sheira, где мы вместе сможем помогать другим людям
              
              ${url}
            `)
              onSimpleMessage("Ссылка скопирована")
            }
          }}
        />
      </div>
    </article>
  )
}

NoFriends.displayName = "NoFriends"
export default NoFriends
