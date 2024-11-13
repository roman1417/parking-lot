export const currencyFormatter = (
    region: string,
    currency: string,
    amount: number
) => {
    return new Intl.NumberFormat(region, {
        style: 'currency',
        currency,
    }).format(amount)
}
