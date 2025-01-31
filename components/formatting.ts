function reformatDate(dateString: string | number | Date) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function reformatTime(dateString: string | number | Date) {
  const date = new Date(dateString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}

function formatCurrency(amountString: string, currencyCode: any) {
  const amount = parseFloat(amountString) // Convert string to number
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0, 
  }).format(amount)
}

export { reformatDate, reformatTime, formatCurrency }
