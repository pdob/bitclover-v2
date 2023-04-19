import { SupportedCurrencies } from '../types/Home'

export const getCurrencySymbol = (currency: SupportedCurrencies) => {
  switch(currency) {
  case 'GBP':
    return '£'
    break
  case 'EUR':
    return '€'
    break
  default:
    return '$'
    break
  }
}