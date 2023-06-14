'use client'

import { ReactNode, useEffect } from 'react'
import { useInitialDataStore } from '@stores/initial-data'
import { IInitialData } from '@interfaces'

interface IBoxProps {
    children: ReactNode
    initialData: IInitialData
}

// This component is currently not in use
export const GraphsWrapper = ({ children, initialData }: IBoxProps) => {
    const initialDataFromStore = useInitialDataStore((state) => state.initialData)
    const setInitialData = useInitialDataStore((state) => state.setInitialData)

    // Set initial data
    useEffect(() => {
        setInitialData(initialData)
    }, [setInitialData, initialData])

    if (!initialDataFromStore?.campaign) return null

    return <>{children}</>
}
