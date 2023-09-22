import { z } from 'zod'
import { DashboardName } from '@enums'
import _ from 'lodash'

const dashboards = _.values(DashboardName)

export const activeDashboardSchema = z.object({
    // @ts-ignore
    active_dashboard: z.enum(dashboards),
})

export type TActiveDashboard = z.infer<typeof activeDashboardSchema>
