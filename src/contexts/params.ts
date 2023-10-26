import { createContext } from 'react'
import { IParams } from '@interfaces'

interface IParamsContext {
    params: IParams
    setParams: (fn: (prev: IParams) => IParams) => void
}

export const ParamsContext = createContext<IParamsContext>(undefined as any)
