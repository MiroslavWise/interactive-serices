export const checkPasswordStrength = (password: string): boolean =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g.test(password)
