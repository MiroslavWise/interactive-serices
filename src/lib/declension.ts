export function DeclensionQuantityFriends(length: number) {
    if (length >= 5 && length <= 20) {
        return `У вас ${length} друзей`
    }
    if ([5, 6, 7, 8, 9, 0].includes(length % 10)) {
        return `У вас ${length} друзей`
    }
    if ([2, 3, 4].includes(length)) {
        return `У вас ${length} друга`
    }
    if (length % 10 === 1) {
        return `У вас ${length} друг`
    }

    return `У вас нет друзей`
}
