import { type TOrder } from "../types/general"
import { type IUserOffer as IUserSmall } from "../offers/types"
import { type IAddressesResponse } from "../addresses/types/serviceAddresses"
import { INotes } from "../notes/types"
import { EnumHelper } from "@/types/enum"
import { IResponse } from "../request/types"

export interface IBodyPost {
  title: string
  slug: string
  enabled: boolean
  addresses: number[]
  archive?: boolean
  // isAuthRead: boolean
  urgent?: boolean
  isParticipants?: boolean
}

export interface IPosts {
  id: number
  enabled: boolean
  title: string //varChar - 256
  slug: string //varChar - 256
  userId: number
  urgent?: EnumHelper
  user: IUserSmall
  addresses: IAddressesResponse[]
  updated: string
  created: string
  questionnaireId?: number //id опросника
  questionnaire: IQuestionnaire
  archive: boolean //default - false
  archived: string //время, когда запись была отправлена в архив
  notes: INotes[]
  isParticipants: boolean
}

interface IQuestionnaire {
  id: number
  title: string
  description: string
  enabled: boolean
  userId: number
  user: IUserSmall
  updated: string
  created: string
  questionsIds: number[]
  questions: IQuestion[]
  isOptionChange: boolean // Возможность изменить свой ответ
  isManyVariants: boolean // при true - множественный выбор
}

interface IQuestion {
  id: number
  name: string
  userAnswers: number[] // {{user_id}}[]
}

interface IQueries {
  order?: TOrder
  user?: number
  limit?: number
  page?: number
  archive?: 1 | 0
}

export type TPostPosts = (body: IBodyPost) => Promise<IResponse<IPosts>>
export type TPatchPost = (id: number, body: Partial<IBodyPost>) => Promise<IResponse<IPosts>>
export type TGetPosts = ({}: IQueries) => Promise<IResponse<IPosts[]>>
export type TGetPostsFromUser = ({}: { query?: IQueries } & { userId: number }) => Promise<IResponse<IPosts[]>>
export type TGetPostId = (id: number | string) => Promise<IResponse<IPosts>>

// enum ENumAction {
//   REGISTRATION = "registration", // Открыть модальное окно регистрации
//   LOGIN = "login", // Открыть модальное окно логина
//   CUSTOMER = "customer", // Перейти на страницу пользователя
//   HREF = "href", //Переход на сторонний ресурс
// }
// interface ActiveButton {
//   label: string // Лэйбел, который будет отображаться в именовании кнопки
//   action: ENumAction // Активность, которую нужно вызвать (при создании - это выпадающий селектор)
//   targetId?: number // Если действие вызывает переход на какую-то страницу или октрытие модалки с конкретными данными
//   href?: string // Если выбрано действие, которое предполагает переход на сторонний ресурс
//   type: TTypeButtonPrimary // Тип кнопки (при создании - выпадающий селектор)

// }
