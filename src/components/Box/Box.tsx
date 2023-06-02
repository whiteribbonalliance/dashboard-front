import { ReactNode } from 'react'

interface IBoxProps {
    children: ReactNode
}

export const Box = ({ children }: IBoxProps) => {
    return <div className="h-full rounded-md bg-grayLight p-4">{children}</div>
}
