import { type IResponse } from "../request"
import { type TOrder } from "../types/general"
import { type IUserOffer as IUserSmall } from "../offers/types"
import { type IAddressesResponse } from "../addresses/types/serviceAddresses"
import { INotes } from "../notes/types"
import { EnumHelper } from "@/types/enum"

export interface IBodyPost {
  title: string
  slug: string
  addresses: number[]
  archive?: boolean
  urgent?: EnumHelper
}

export interface IPosts {
  id: number
  enabled: boolean
  title: string //varChar - 256
  slug: string //varChar - 256
  userId: number
  user: IUserSmall
  addresses: IAddressesResponse[]
  updated: string
  created: string
  questionnaireId?: number //id опросника
  questionnaire: IQuestionnaire
  archive: boolean //default - false
  archived: string //время, когда запись была отправлена в архив
  notes: INotes[]
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
