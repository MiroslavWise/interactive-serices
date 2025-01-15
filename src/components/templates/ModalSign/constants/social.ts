import env from "@/config/environment"
import type { ILinkSocial } from "../types/types"

const ID_VK = 51817076

const url = new URL(`https://id.vk.com/auth`)
url.searchParams.set(`client_id`, ID_VK.toString())
url.searchParams.set(`redirect_uri`, `${env.server.host}/oauth2/vk`)
url.searchParams.set(`response_type`, "code")
url.searchParams.set(`state`, "1f3hxIi1BC5uB5afKOiH")

export const ITEMS_SOCIAL_LINK: ILinkSocial[] = [
  // {
  //     value: "google",
  //     srcWorking: "/icons/fill/google.svg",
  //     srcNotWorking: "/icons/fill/disabled/google.svg",
  //     path: "/google/login",
  //     isWorkingLink: true,
  // },
  {
    value: "telegram",
    srcWorking: "/icons/fill/telegram.svg",
    srcNotWorking: "/icons/fill/disabled/telegram.svg",
    path: "/telegram/login",
    isWorkingLink: true,
  },
  // {
  //     value: "apple",
  //     srcWorking: "/icons/fill/apple.svg",
  //     srcNotWorking: "/icons/fill/disabled/apple.svg",
  //     path: "/apple/login",
  //     isWorkingLink: false,
  // },
  {
    value: "vk",
    srcWorking: "/icons/fill/vk.svg",
    srcNotWorking: "/icons/fill/vk.svg",
    // path: url.toString(),
    path: "/vk/login",
    isWorkingLink: true,
  },
  {
    value: "yandex",
    srcWorking: "/icons/fill/yandex.svg",
    srcNotWorking: "/icons/fill/disabled/apple.svg",
    path: "/yandex/login",
    isWorkingLink: true,
  },
]

// https`://id.vk.com/auth?return_auth_hash=3ae723dffd7c17083b&redirect_uri=https%3A%2F%2Fdev.sheira.ru%2Foauth2%2Fvk&redirect_uri_hash=8a20855722295561cd&force_hash=&app_id=51817076&response_type=token&code_challenge=&code_challenge_method=&scope=4194304&state=6aaeUZvkC0yD35DxMAO19w%3D%3D
