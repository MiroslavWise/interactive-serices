import crypto from "crypto"

export function generateShortHash(inputString: string): string {
  if (!inputString) return ""
  const hash = crypto.createHash("sha256").update(inputString).digest("hex")
  return hash.substring(0, 12)
}
