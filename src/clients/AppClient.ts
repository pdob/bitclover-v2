/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Config from 'react-native-config'
import { RequestParams } from '../../types/api/Api'
import { CoinData } from '../../types/Home'
import { SupportedCurrencies } from '../types/Home'

class AppClient {
  private API_URL: string

  constructor(apiUrl: string = Config.API_URL!) {
    this.API_URL = apiUrl
  }
  
  async makeRequest<T> (path: string, params?: RequestParams): Promise<T> {
    const response = await fetch(`${this.API_URL}${path}`, {
      method: params?.method || 'GET',
      headers: {
        Accept: 'application/json',
        ...params?.headers,
      },
      body: JSON.stringify(params?.body) || undefined
    })
    return response.json()
  }
  
  public async getAllCoinPrices(currency: SupportedCurrencies) {
    const response = await this.makeRequest<CoinData[]>(`markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
    return response
  }
}

const appClient = new AppClient()

export default appClient