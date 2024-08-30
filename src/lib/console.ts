type TConsoleT = "error" | "warning" | "success"

const color: Record<TConsoleT, string> = {
  error: "\x1b[31m",
  warning: "\x1b[33m",
  success: "\x1b[32m",
}

export const clg = (str: string, value: any, type?: TConsoleT) => console.log(`${color[type ?? "success"]} ::${str}::`, value)
