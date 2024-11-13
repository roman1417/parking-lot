import { useContext, useState, useRef, useEffect } from 'react'

import { AreasContext } from '../../store/areas-context'
import { isWeekend, timeToMinutes, todaysDate } from '../../utils/date'
import { currencyFormatter } from '../../utils/currency'
import classes from './CalculateForm.module.css'

const CalculateForm = () => {
    const { areas } = useContext(AreasContext)
    const areaIdEl = useRef<HTMLSelectElement>(null)
    const startTimeEl = useRef<HTMLInputElement>(null)
    const endTimeEl = useRef<HTMLInputElement>(null)
    const dateEl = useRef<HTMLInputElement>(null)
    const [isValidTimeRange, setIsValidTimeRange] = useState(true)
    const [isFetching, setIsFetching] = useState(false)
    const [fetchingError, setFetchingError] = useState('')
    const [amount, setAmount] = useState(0)
    const [currency, setCurrency] = useState('USD')
    const [usdToEurRate, setUsdToEurRate] = useState(0)
    const [usdToPlnRate, setUsdToPlnRate] = useState(0)
    const [isCurrencyConverted, setIsCurrencyConverted] = useState(false)

    useEffect(() => {
        if (
            isCurrencyConverted ||
            currency === 'USD' ||
            !dateEl.current?.value ||
            amount === 0
        )
            return
        async function fetchRates() {
            const exchangerateApiKey = import.meta.env.VITE_EXCHANGERATE_API_KEY
            const date = dateEl.current?.value || ''
            setIsFetching(true)
            setFetchingError('')
            try {
                const response = await fetch(
                    `https://api.exchangeratesapi.io/v1/${date}?access_key=${exchangerateApiKey}&base=EUR&symbols=PLN,USD`
                )
                const data = await response.json()
                if (data.success) {
                    const eurToPln = data.rates.PLN
                    const eurToUsd = data.rates.USD
                    setUsdToPlnRate(eurToPln / eurToUsd)
                    setUsdToEurRate(1 / eurToUsd)
                    setIsCurrencyConverted(true)
                } else {
                    setFetchingError('Failed to fetch exchange rate data.')
                    console.error('Failed to fetch exchange rate data:', data)
                }
                setIsFetching(false)
            } catch (error) {
                setFetchingError('An error occurred!')
                console.error('An error occurred:', error)
                setIsFetching(false)
            }
        }
        fetchRates()
    }, [isCurrencyConverted, currency, amount])

    const handleCurrencyChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCurrency(event.target.value)
    }

    async function handleCalculate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setFetchingError('')

        const areaId = areaIdEl.current?.value
        const startTime = startTimeEl.current?.value
        const endTime = endTimeEl.current?.value
        const date = dateEl.current?.value || ''

        if (startTime && endTime && startTime > endTime) {
            setIsValidTimeRange(false)
            return
        }
        setIsValidTimeRange(true)

        const selectedArea = areas.find(area => area.id === areaId)

        const startMinutes = timeToMinutes(startTime)
        const endMinutes = timeToMinutes(endTime)
        const durationMinutes = endMinutes - startMinutes

        const weekdaysRate = selectedArea?.weekdaysRate ?? 0
        const weekendRate = selectedArea?.weekendRate ?? 0
        const discount = selectedArea?.discount ?? 0

        const ratePerMinute = isWeekend(date)
            ? weekendRate / 60
            : weekdaysRate / 60

        let totalAmount = durationMinutes * ratePerMinute

        if (discount > 0) {
            totalAmount -= totalAmount * (discount / 100)
        }
        setCurrency('USD')
        setIsCurrencyConverted(false)
        setAmount(totalAmount)
    }

    let amountToPay = currencyFormatter('en-US', 'USD', amount)
    if (currency === 'EUR') {
        amountToPay = currencyFormatter('de-DE', 'EUR', amount * usdToEurRate)
    }
    if (currency === 'PLN') {
        amountToPay = currencyFormatter('pl-PL', 'PLN', amount * usdToPlnRate)
    }

    return (
        <div className={classes.calculate}>
            {areas.length > 0 && (
                <>
                    <form onSubmit={handleCalculate} className={classes.form}>
                        <label htmlFor="area">Select parking-area</label>
                        <select id="area" name="area" required ref={areaIdEl}>
                            {areas.map(area => (
                                <option key={area.id} value={area.id}>
                                    {area.name}
                                </option>
                            ))}
                        </select>
                        {!isValidTimeRange && (
                            <p className="error">
                                Parking end time must be greater than parking
                                start time
                            </p>
                        )}
                        <label htmlFor="start-time">Parking start time</label>
                        <input
                            type="time"
                            id="start-time"
                            name="start-time"
                            pattern="[0-9]{2}:[0-9]{2}"
                            required
                            ref={startTimeEl}
                        />
                        <label htmlFor="end-time">Parking end time</label>
                        <input
                            type="time"
                            id="end-time"
                            name="end-time"
                            pattern="[0-9]{2}:[0-9]{2}"
                            required
                            ref={endTimeEl}
                        />
                        <label htmlFor="date">Parking day</label>
                        <input
                            type="date"
                            max={todaysDate()}
                            id="date"
                            name="date"
                            required
                            ref={dateEl}
                        />
                        <div className={classes.actions}>
                            <button type="submit">Calculate</button>
                        </div>
                    </form>
                    {isFetching && <p>Fetching exchange rate data...</p>}
                    {fetchingError && (
                        <p className={classes.error}>{fetchingError}</p>
                    )}
                    <fieldset className={classes.fieldset}>
                        <legend>Select currency</legend>
                        <div className={classes.control}>
                            <input
                                id="usd"
                                type="radio"
                                value="USD"
                                checked={currency === 'USD'}
                                onChange={handleCurrencyChange}
                            />
                            <label htmlFor="usd">USD</label>
                        </div>
                        <div className={classes.control}>
                            <input
                                id="eur"
                                type="radio"
                                value="EUR"
                                checked={currency === 'EUR'}
                                onChange={handleCurrencyChange}
                            />
                            <label htmlFor="eur">EUR</label>
                        </div>
                        <div className={classes.control}>
                            <input
                                id="pln"
                                type="radio"
                                value="PLN"
                                checked={currency === 'PLN'}
                                onChange={handleCurrencyChange}
                            />
                            <label htmlFor="pln">PLN</label>
                        </div>
                    </fieldset>
                    <h2>
                        Amount to pay: <span className="payment"></span>
                        {amountToPay}
                    </h2>
                </>
            )}
            {areas.length === 0 && <h2>No parking areas</h2>}
        </div>
    )
}

export default CalculateForm
