import React from 'react'
import { Header } from '../Header/Header'

export const Main = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
