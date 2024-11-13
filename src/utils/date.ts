export const todaysDate = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')

    return `${yyyy}-${mm}-${dd}`
}

export const isWeekend = (dateString: string) => {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/
    const match = dateString.match(regex)

    if (!match) {
        throw new Error('Incorrect date format. Expected yyyy-mm-dd.')
    }

    const year = parseInt(match[1], 10)
    const month = parseInt(match[2], 10) - 1
    const day = parseInt(match[3], 10)

    const date = new Date(year, month, day)

    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
}

export const timeToMinutes = (time: string = '') => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
}
