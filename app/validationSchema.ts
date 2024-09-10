//all future validation schemas can be added and reused from here
import {z} from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})