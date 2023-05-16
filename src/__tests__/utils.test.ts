import { getCurrencySymbol, formatCurrency, formatLargeNumbers, calculatePercentageChange } from '../functions/utils'

describe('Get currency symbol', () => {
  it('should return correct currency symbol for USD', () => {
    const currency = 'USD'
    expect(getCurrencySymbol(currency)).toEqual('$')
  })

  it('should return correct currency GBP', () => {
    const currency = 'GBP'
    expect(getCurrencySymbol(currency)).toEqual('£')
  })

  it('should return correct currency EUR', () => {
    const currency = 'EUR'
    expect(getCurrencySymbol(currency)).toEqual('€')
  })
})

describe('Format currency based on number', () => {
  it('Should format 1.05 to 2 decimal points and right currency symbol for USD', () => {
    const price = 1.05
    const currency = 'USD'
    expect(formatCurrency(price, currency)).toEqual('$1.05')
  })

  it('Should format 0.015 to 4 decimal points and right currency symbol for GBP', () => {
    const price = 0.015
    const currency = 'GBP'
    expect(formatCurrency(price, currency)).toEqual('£0.0150')
  })

  it('Should format 0.00005 to 8 decimal points and right currency symbol for EUR', () => {
    const price = 0.00005
    const currency = 'EUR'
    expect(formatCurrency(price, currency)).toEqual('€0.00005000')
  })
})

describe('Format large numbers correctly', () => {
  it('Should correctly format 150 Million', () => {
    const number = 150000000
    expect(formatLargeNumbers(number)).toEqual('150 Million')
  })

  it('Should correctly format 5 Billion', () => {
    const number = 5000000000
    expect(formatLargeNumbers(number)).toEqual('5 Billion')
  })

  it('Should correctly format 2 Trillion', () => {
    const number = 2000000000000
    expect(formatLargeNumbers(number)).toEqual('2 Trillion')
  })
})

describe('Calculate percentage change based on 2 prices', () => {
  it('Should return -37.59 from the 2 prices inputted', () => {
    const currentPrice = 6241
    const priceAtPoint = 10000
    expect(calculatePercentageChange(currentPrice, priceAtPoint)).toEqual(-37.59)
  })
})
