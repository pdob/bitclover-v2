/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Config} from 'react-native-config'
import { TimePeriod } from '../screens/CoinInfo'
import { ChartData } from '../types/CoinInfo'
import { CoinData, SupportedCurrencies } from '../types/Home'

class AppClient {
  private API_URL: string

  constructor(apiUrl: string = Config.API_URL || 'https://api.coingecko.com/api/v3/coins/') {
    this.API_URL = apiUrl
  }
  
  async makeRequest<T> (path: string): Promise<T> {
    const response = await fetch(`${this.API_URL}${path}`)
    return response.json()
  }

  private formatFavouritesQuery (ids: string[]): string {
    const formattedIds = ids.map((id) => `${encodeURIComponent(id)}`).join('%2C%20')
    return `ids=${formattedIds}`
  }
  
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public async getAllCoinPrices(currency: SupportedCurrencies, perPage: number = 100) {
    const response = await this.makeRequest<CoinData[]>(`markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&locale=en`)
    return response
  }

  public async getCoinInfo(id: string): Promise<CoinData> {
    const response = await this.makeRequest(`${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`)
    return response.market_data
  }

  public async getCoinChartData(id: string, currency: SupportedCurrencies, days: TimePeriod): ChartData {
    const response = await this.makeRequest(`${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${
      days <= 30 ? 'hourly' : 'daily'
    }`)
    return response
  }

  public async fetchFavourites(ids: string[], currency: SupportedCurrencies): Promise<CoinData[] | []>{
    const response: CoinData[] = await this.makeRequest(`markets?vs_currency=${currency}&${this.formatFavouritesQuery(ids)}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
    return ids.length ? response : []
  }
}

const appClient = new AppClient()

export default appClient