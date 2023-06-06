import { z } from 'zod'

export const whoThePeopleAreSchema = z.object({
    show_breakdown_by: z.string(),
})

export type WhoThePeopleAre = z.infer<typeof whoThePeopleAreSchema>
