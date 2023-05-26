import { SupportedCurrencies } from './Home'

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
  current_price?: PriceObject
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

export type CoinPrice = {
  [key: string]: {
    [key: string]: number
  }
}

export type CoinInfo = {
  additional_notices: []
  asset_platform_id: string
  block_time_in_minutes: number
  categories: string[]
  coingecko_rank: number
  coingecko_score: number
  community_score: number
  contract_address: string
  country_origin: string
  description: object
  detail_platforms: object
  developer_score: number
  genesis_date: null
  hashing_algorithm: null
  id: string
  image: object
  last_updated: string
  links: object
  liquidity_score: number
  market_cap_rank: number
  market_data: CoinData
  name: string
  platforms: object
  public_interest_score: number
  public_interest_stats: object
  public_notice: null
  sentiment_votes_down_percentage: number
  sentiment_votes_up_percentage: number
  status_updates: []
  symbol: string
  watchlist_portfolio_users: number
}


