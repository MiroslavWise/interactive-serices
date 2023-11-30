export const borderClassNames = (indexActive: number, index: number, length: number): string => {
    if (index + 1 !== indexActive && index !== length - 1) {
        return "border-right"
    }

    if (index - 1 !== indexActive && index !== 0) {
        return "border-left"
    }
    return ""
}
