import { z } from 'zod'

export const histogramSchema = z.object({
    show_breakdown_by: z.string(),
})

export type THistogram = z.infer<typeof histogramSchema>
