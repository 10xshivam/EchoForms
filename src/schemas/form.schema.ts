import { z } from "zod"

export const createInput = z.string().min(16, "Report ID must be exactly 10 characters long")