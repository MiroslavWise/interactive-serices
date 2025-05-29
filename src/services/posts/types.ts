import { IPaginateQuery, type TOrder } from "../types/general"
import { IUserOffer, type IUserOffer as IUserSmall } from "../offers/types"
import { type IAddressesResponse } from "../addresses/types/serviceAddresses"
import { INotes } from "../notes/types"
import { EnumHelper } from "@/types/enum"
import { IResponse } from "../request/types"
import { ICompany } from "../types/company"

export interface IBodyPost {
  title: string
  slug: string
  enabled: boolean
  addresses: number[]
  archive?: boolean
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
  /** Пост в архиве
   * @default false
   */
  archive: boolean
  /** Время, когда запись была отправлена в архив */
  archived: string
  notes: INotes[]
  /** Признак участника */
  isParticipants: boolean
  /** Рекламное агентство */
  company?: ICompany
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

interface IQueries extends IPaginateQuery {
  user?: number
  archive?: 1 | 0
}

export type TPostPosts = (body: IBodyPost & { userId?: number }) => Promise<IResponse<IPosts>>
export type TPatchPost = (id: number, body: Partial<IBodyPost>) => Promise<IResponse<IPosts>>
export type TGetPosts = ({}: IQueries, isInvalid?: boolean) => Promise<IResponse<IPosts[]>>
export type TGetPostsFromUser = ({}: { query?: IQueries } & { userId: number }) => Promise<IResponse<IPosts[]>>
export type TGetPostId = (id: number | string) => Promise<IResponse<IPosts>>
export type TGetPostParticipants = (id: number) => Promise<IResponse<{ participants: IUserOffer[] }>>
