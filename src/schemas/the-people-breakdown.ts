import { z } from 'zod'

export const thePeopleBreakdownSchema = z.object({
    show_breakdown_by: z.string(),
})

export type ThePeopleBreakdown = z.infer<typeof thePeopleBreakdownSchema>
