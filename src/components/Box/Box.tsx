import { ReactNode } from 'react'

interface IBoxProps {
    children: ReactNode
}

export const Box = ({ children }: IBoxProps) => {
    return <div className="bg-grayLight h-full rounded-md p-4">{children}</div>
}
