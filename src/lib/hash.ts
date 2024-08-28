import crypto from "crypto"

export function generateShortHash(inputString: string): string {
  if (!inputString) return ""
  return crypto.createHash("sha256").update(inputString).digest("hex").substring(0, 12)
}
