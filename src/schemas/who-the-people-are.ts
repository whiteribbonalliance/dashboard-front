import { z } from 'zod'

export const whoThePeopleAreSchema = z.object({
    show_breakdown_by: z.string(),
})

export type TWhoThePeopleAre = z.infer<typeof whoThePeopleAreSchema>
