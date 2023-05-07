import { SupportedCurrencies } from "./Home";

export interface CurrencyObject {
  [key: SupportedCurrencies]: number
}

export type ChartData = [][{
  [key: number]: number
}]

export type PriceObject = {
  [key: string]: number
}

export type CoinData = {
  ath: CurrencyObject
  ath_change_percentage: object
  ath_date: object
  atl: object
  atl_change_percentage: object
  atl_date: object
  circulating_supply: number
  current_price: PriceObject
  fully_diluted_valuation: object
  high_24h: object
  last_updated: string
  low_24h: object
  market_cap: CurrencyObject
  market_cap_change_24h: number
  market_cap_change_24h_in_currency: object
  market_cap_change_percentage_24h: number
  market_cap_change_percentage_24h_in_currency: object
  market_cap_rank: number
  price_change_24h: number
  price_change_24h_in_currency: object
  price_change_percentage_1h_in_currency: object
  price_change_percentage_1y: number
  price_change_percentage_1y_in_currency: object
  price_change_percentage_7d: number
  price_change_percentage_7d_in_currency: object
  price_change_percentage_14d: number
  price_change_percentage_14d_in_currency: object
  price_change_percentage_24h: number
  price_change_percentage_24h_in_currency: object
  price_change_percentage_30d: number
  price_change_percentage_30d_in_currency: object
  price_change_percentage_60d: number
  price_change_percentage_60d_in_currency: object
  price_change_percentage_200d: number
  price_change_percentage_200d_in_currency: object
  roi: object
  total_supply: number
  total_volume: object
}