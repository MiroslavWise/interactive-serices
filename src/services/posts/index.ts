import {
  type TGetPosts,
  type TPatchPost,
  type TGetPostId,
  type TPostPosts,
  type TGetPostsFromUser,
  type TGetPostParticipants,
} from "./types"

import { fetchGet, post, patch, wrapperDelete, wrapperPatch } from "../request"

const url = "/posts"

/** Создание поста */
export const postPosts: TPostPosts = (body) => post({ url, body }, true)
/** Обновление поста */
export const patchPost: TPatchPost = (id, body) => patch({ url: `${url}/${id}`, body })
/** Список постов */
export const getPosts: TGetPosts = (query, isInvalid) => fetchGet({ url, query }, isInvalid)
/** Список постов юзера */
export const getPostsFromUser: TGetPostsFromUser = ({ query, userId }) => fetchGet({ url: `${url}/user/${userId}`, query })
/** Пост по {{post_id}} */
export const getPostId: TGetPostId = (id) => fetchGet({ url: `${url}/${id}` })
/** Запись на участие в событии */
export const patchFromParticipantPosts = (id: number) => patch({ url: `${url}/participants/${id}`, body: {} })
/** Получение участников поста по {{post_id}} */
export const getPostParticipants: TGetPostParticipants = (id) => fetchGet({ url: `${url}/participants/${id}` })
/** Удаление поста по {{post_id}} */
export const deletePostId = (id: number) => wrapperDelete({ url, id })
/** Запрос для модератора */
export const patchAdvertPosts = (id: number, companyId: number) => wrapperPatch({ url, body: { companyId: companyId }, id })
/** Удаление участника события */
export const deletePostParticipantId = (id: number, idUser: number) => wrapperDelete({ url: `/posts/participants`, id: `${id}/${idUser}` })
