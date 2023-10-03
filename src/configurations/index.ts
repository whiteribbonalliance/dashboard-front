import { configuration as whatWomenWantConfig } from './what-women-want'
import { configuration as whatYoungPeopleWantConfig } from './what-young-people-want'
import { configuration as midwivesVoicesConfig } from './midwives-voices'
import { configuration as healthwellbeingConfig } from './healthwellbeing'
import { configuration as economicEmpowermentMexicoConfig } from './economic-empowerment-mexico'
import { configuration as whatWomenWantPakistanConfig } from './what-women-want-pakistan'
import { configuration as womensEconomicEmpowermentConfig } from './womens-economic-empowerment'
import { configuration as allCampaignsConfig } from './all-campaigns'

export { whatWomenWantConfig }
export { whatYoungPeopleWantConfig }
export { midwivesVoicesConfig }
export { healthwellbeingConfig }
export { economicEmpowermentMexicoConfig }
export { whatWomenWantPakistanConfig }
export { womensEconomicEmpowermentConfig }
export { allCampaignsConfig }

// TODO: Temporarily hide womenseconomicempowerment
export const dashboardsConfigs = [
    allCampaignsConfig,
    whatWomenWantConfig,
    whatYoungPeopleWantConfig,
    midwivesVoicesConfig,
    healthwellbeingConfig,
    economicEmpowermentMexicoConfig,
    whatWomenWantPakistanConfig,
    // womensEconomicEmpowermentConfig,
]
