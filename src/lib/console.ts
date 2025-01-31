type TConsoleT = "error" | "warning" | "success"

const color: Record<TConsoleT, string> = {
  error: "#FF0000",
  warning: "#FF4500",
  success: "#00FF00",
}

export const clg = (str: string, value: any, type?: TConsoleT) =>
  console.log(`%c${str}`, `font-size: 18px;padding: 4px; background: ${color[type ?? "success"]}; color:white;`, value)
