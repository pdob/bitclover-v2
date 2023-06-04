import { Config } from 'react-native-config'
import { TimePeriod } from '../screens/CoinInfo'
import { ChartData, CoinPrice, CoinInfo } from '../types/CoinInfo'
import { CoinData, SupportedCurrencies } from '../types/Home'
import { ExchangeItem } from '../screens/Exchanges'
import axios from 'axios'

class AppClient {
  private API_URL: string

  constructor(apiUrl: string = Config.API_URL || 'https://api.coingecko.com/api/v3/') {
    this.API_URL = apiUrl
  }
  
  async makeRequest<T> (path: string): Promise<T> {
    const response = await axios.get(`${this.API_URL}${path}`)
    return response.data
  }

  private formatFavouritesQuery (ids: string[]): string {
    const formattedIds = ids.map((id) => `${encodeURIComponent(id)}`).join('%2C%20')
    return `ids=${formattedIds}`
  }
  
  public async getAllCoinPrices(currency: SupportedCurrencies, perPage = 100): Promise<CoinData[]> {
    const response = await this.makeRequest<CoinData[]>(`coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&locale=en`)
    return response
  }

  public async getCoinInfo(id: string): Promise<CoinInfo> {
    const response = await this.makeRequest<CoinInfo>(`coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`)
    return response
  }

  public async getCoinChartData(id: string, currency: SupportedCurrencies, days: TimePeriod): Promise<ChartData> {
    const response = await this.makeRequest<ChartData>(`coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${
      days <= 30 ? 'hourly' : 'daily'
    }`)
    return response
  }

  public async fetchFavourites(ids: string[], currency: SupportedCurrencies): Promise<CoinData[] | []>{
    const response = await this.makeRequest<CoinData[]>(`coins/markets?vs_currency=${currency}&${this.formatFavouritesQuery(ids)}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
    return ids.length ? response : []
  }
  
  public async getAllExchanges(perPage = 50): Promise<ExchangeItem[]>{
    const response = await this.makeRequest<ExchangeItem[]>(`exchanges?per_page=${perPage}`)
    return response
  }

  public async getCoinPrice(id: string): Promise<CoinPrice> {
    const response = await this.makeRequest<CoinPrice>(`simple/price?ids=${id}&vs_currencies=usd%2Cgbp%2Ceur`)
    return response
  }
}

const appClient = new AppClient()

export default appClient