import { SupportedCurrencies } from '../types/Home'
import millify from 'millify'
import { TimePeriod } from '../screens/CoinInfo'
import { ChartData } from '../types/CoinInfo'
import { AxiosError } from 'axios'

export const getCurrencySymbol = (currency: SupportedCurrencies): string => {
  switch(currency.toUpperCase()) {
  case 'GBP':
    return '£'
    break
  case 'EUR':
    return '€'
    break
  case 'USD':
    return '$'
    break
  default: 
    return ''
  }
}

export const formatCurrency = (price: number, currency: SupportedCurrencies): string => {
  if (price > 0.10) {
    return `${getCurrencySymbol(currency)}${price.toFixed(2)}`
  } else if (price > 0.01 && price > 0.0001) {
    return `${getCurrencySymbol(currency)}${price.toFixed(4)}`
  } else if (price) {
    return `${getCurrencySymbol(currency)}${price.toFixed(8)}`
  } else {
    return '0'
  }
}

export const formatLargeNumbers = (number: number) => {
  return millify(number, {
    precision: 2,
    units: ['', '', 'Million', 'Billion', 'Trillion', 'Quadrillion'],
    space: true,
  })
}

export const calculatePercentageChange = (currentPrice: number, priceAtPoint: number): number => {
  const percentageChange = ((currentPrice - priceAtPoint) / priceAtPoint) * 100
  return Number(percentageChange.toFixed(2))
}

export const getPercentageForTimePeriod = (data: ChartData, timePeriod: TimePeriod): number => {
  let key: string

  switch (timePeriod) {
  case 1:
    key = 'price_change_percentage_24h'
    break
  case 7:
    key = 'price_change_percentage_7d'
    break
  case 30: 
    key = 'price_change_percentage_30d'
    break
  case 60: 
    key = 'price_change_percentage_60d'
    break
  default:
    key = 'price_change_percentage_1y'
    break
  }

  const value = data[key]
  return value?.toFixed(2)
}

export const handleError = ({error} : {error: AxiosError}) : string => {
  if (error.response?.status === 429) {
    return 'API call limit exceeded, please try again in a minute.'
  } else {
    return error.message
  }
}