import { z } from 'zod'
import { dashboardNames } from '../enums/dashboard-name'

export const allCampaignsActiveDashboardSchema = z.object({
    active_dashboard: z.enum(dashboardNames),
})

export type TAllCampaignsActiveDashboard = z.infer<typeof allCampaignsActiveDashboardSchema>
