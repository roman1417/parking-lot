class Area {
    id: string
    name: string
    weekdaysRate: number
    weekendRate: number
    discount: number

    constructor(
        name: string,
        weekdaysRate: number,
        weekendRate: number,
        discount: number
    ) {
        this.id = new Date().toISOString()
        this.name = name
        this.weekdaysRate = weekdaysRate
        this.weekendRate = weekendRate
        this.discount = discount
    }
}

export default Area
