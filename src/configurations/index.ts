/*
MIT License

Copyright (c) 2023 White Ribbon Alliance. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

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
