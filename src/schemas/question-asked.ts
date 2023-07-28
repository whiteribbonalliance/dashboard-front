import { z } from 'zod'

export const questionAskedSchema = z.object({
    question_asked_code: z.string(),
})

export type TQuestionAsked = z.infer<typeof questionAskedSchema>
