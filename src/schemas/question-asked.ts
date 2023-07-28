import { z } from 'zod'
import { questionsCodes } from '@constants'

export const questionAskedSchema = z.object({
    question_asked_code: z.enum(questionsCodes),
})

export type TQuestionAsked = z.infer<typeof questionAskedSchema>
