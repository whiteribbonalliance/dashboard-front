import { z } from 'zod'

export const questionAskedSchema = z.object({
    question_asked: z.string(),
})

export type QuestionAsked = z.infer<typeof questionAskedSchema>
