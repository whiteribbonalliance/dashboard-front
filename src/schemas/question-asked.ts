import { z } from 'zod'
import { questionCodes } from '@constants'

export const questionAskedSchema = z.object({
    question_asked_code: z.enum(questionCodes),
})

export type TQuestionAsked = z.infer<typeof questionAskedSchema>
