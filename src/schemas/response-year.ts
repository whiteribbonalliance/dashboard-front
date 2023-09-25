import { z } from 'zod'

export const responseYearSchema = z.object({
    response_year: z.string(),
})

export type TResponseYear = z.infer<typeof responseYearSchema>
