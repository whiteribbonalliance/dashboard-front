import Select from 'react-select'
import React from 'react'
import { Option } from '@types'
import { IRefetchCampaignState, useRefetchCampaignStore } from '@stores/refetch-campaign'

interface ISelectMultiValuesProps {
    id: string
    isDisabled?: boolean
    options: (Option<string> | Option<boolean>)[]
    value: string[]
    controllerRenderOnChange: (...event: any[]) => void
}

export const SelectMultiValues = ({
    id,
    isDisabled,
    options,
    value,
    controllerRenderOnChange,
}: ISelectMultiValuesProps) => {
    const refetchCampaign = useRefetchCampaignStore((state: IRefetchCampaignState) => state.refetchCampaign)

    return (
        <Select
            isDisabled={isDisabled}
            isMulti
            instanceId={id}
            options={options}
            value={value.map((selectedVal) => {
                const option = options.find((option) => option.value === selectedVal)
                if (option) return option
            })}
            onChange={(multiValueOptions) => {
                if (multiValueOptions) {
                    controllerRenderOnChange(
                        multiValueOptions.map((option) => {
                            if (option) return option.value
                        })
                    )
                }

                // Refetch campaign
                if (refetchCampaign) {
                    refetchCampaign()
                }
            }}
        />
    )
}
