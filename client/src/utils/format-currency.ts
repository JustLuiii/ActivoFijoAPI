export const FormatCurrency = ({ currency = 'DOP', value} : {currency?: string, value: number}) => {
  const formatter = new Intl.NumberFormat('es-DO', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency
  }) 

  return formatter.format(value)
}
