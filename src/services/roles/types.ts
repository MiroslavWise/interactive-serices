import { z } from "zod"

export enum ETitleRole {
  SuperAdmin = "superadmin",
  User = "user",
  Admin = "admin",
  Manager = "manager",
  Owner = "owner",
}

const objRole = z.object({
  description: z.string().nullable(),
  id: z.number(),
  title: z.nativeEnum(ETitleRole),
})

export type TRole = z.infer<typeof objRole>
