import Select from 'react-select'
import React from 'react'
import { Option } from '@types'
import { IRefetchCampaignState, useRefetchCampaignStore } from '@stores/refetch-campaign'

interface ISelectSingleValueProps {
    id: string
    options: Option<string | boolean>[]
    value: string | boolean
    controllerRenderOnChange: (...event: any[]) => void
}

export const SelectSingleValue = ({ id, options, value, controllerRenderOnChange }: ISelectSingleValueProps) => {
    const refetchCampaign = useRefetchCampaignStore((state: IRefetchCampaignState) => state.refetchCampaign)

    return (
        <Select
            instanceId={id}
            options={options}
            value={options.find((option) => option.value === value)}
            onChange={(SingleValueOption) => {
                if (SingleValueOption) {
                    controllerRenderOnChange(SingleValueOption.value)
                }

                // Refetch campaign
                if (refetchCampaign) {
                    refetchCampaign()
                }
            }}
        />
    )
}
