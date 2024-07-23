export const DeclensionQuantityFriends = (length: number) =>
  length >= 5 && length <= 20
    ? `У вас ${length} друзей`
    : [5, 6, 7, 8, 9, 0].includes(length % 10)
    ? `У вас ${length} друзей`
    : [2, 3, 4].includes(length)
    ? `У вас ${length} друга`
    : `У вас нет друзей`

export const DeclensionAllQuantityFriends = (length: number) =>
  length >= 5 && length <= 20
    ? `${length} друзей`
    : [5, 6, 7, 8, 9, 0].includes(length % 10)
    ? `${length} друзей`
    : [2, 3, 4].includes(length)
    ? `${length} друга`
    : length % 10 === 1
    ? `${length} друг`
    : `Нет друзей`

export const DeclensionAllQuantityFeedback = (length: number) =>
  length >= 5 && length <= 20
    ? `${length} отзывов`
    : [5, 6, 7, 8, 9, 0].includes(length % 10)
    ? `${length} отзывов`
    : [2, 3, 4].includes(length)
    ? `${length} отзыва`
    : length % 10 === 1
    ? `${length} отзыв`
    : `Нет отзывов`
