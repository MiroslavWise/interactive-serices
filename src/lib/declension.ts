export const DeclensionQuantityFriends = (length: number) =>
  length >= 5 && length <= 20
    ? `У вас ${length} друзей`
    : [5, 6, 7, 8, 9, 0].includes(length % 10)
    ? `У вас ${length} друзей`
    : [2, 3, 4].includes(length)
    ? `У вас ${length} друга`
    : `У вас нет друзей`
