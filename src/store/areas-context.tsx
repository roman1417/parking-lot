import React, { createContext, useState } from 'react'

import Area from '../models/area'

type AreasContextObj = {
    areas: Area[]
    addArea: (
        name: string,
        weekdaysRate: number,
        weekendRate: number,
        discount: number
    ) => void
    replaceArea: (
        id: string,
        name: string,
        weekdaysRate: number,
        weekendRate: number,
        discount: number
    ) => void
    removeArea: (id: string) => void
}

export const AreasContext = createContext<AreasContextObj>({
    areas: [],
    addArea: () => {},
    replaceArea: () => {},
    removeArea: () => {},
})

interface Props {
    children?: React.ReactNode
}

const AreasContextProvider = ({ children }: Props) => {
    const [areas, setAreas] = useState<Area[]>(() => {
        const savedAreas = localStorage.getItem('areas')
        return savedAreas ? JSON.parse(savedAreas) : []
    })

    const addArea = (
        name: string,
        weekdaysRate: number,
        weekendRate: number,
        discount: number
    ) => {
        const newArea = new Area(name, weekdaysRate, weekendRate, discount)

        setAreas(prevAreas => {
            const newAreas = prevAreas.concat(newArea)
            localStorage.setItem('areas', JSON.stringify(newAreas))
            return newAreas
        })
    }

    const replaceArea = (
        id: string,
        name: string,
        weekdaysRate: number,
        weekendRate: number,
        discount: number
    ) => {
        const newArea = new Area(name, weekdaysRate, weekendRate, discount)

        setAreas(prevAreas => {
            const oldAreaIndex = prevAreas.findIndex(area => area.id === id)
            const newAreas = prevAreas.map((area, index) =>
                index === oldAreaIndex ? newArea : area
            )
            localStorage.setItem('areas', JSON.stringify(newAreas))
            return newAreas
        })
    }

    const removeArea = (id: string) => {
        setAreas(prevAreas => {
            const newAreas = prevAreas.filter(area => area.id !== id)
            localStorage.setItem('areas', JSON.stringify(newAreas))
            return newAreas
        })
    }

    const contextValue: AreasContextObj = {
        areas,
        addArea,
        replaceArea,
        removeArea,
    }

    return (
        <AreasContext.Provider value={contextValue}>
            {children}
        </AreasContext.Provider>
    )
}

export default AreasContextProvider
