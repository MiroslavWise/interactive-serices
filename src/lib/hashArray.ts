function charsum(s: any) {
    let sum = 0
    for (let i = 0; i < s.length; i++) {
        sum += s.charCodeAt(i) * (i + 1)
    }
    return sum
}

export function array_hash(a: any[]) {
    if (!a) return null

    let sum = 0

    for (let i = 0; i < a.length; i++) {
        let cs = charsum(a[i])
        sum = sum + 65027 / cs
    }
    return ("" + sum).slice(0, 16)
}
