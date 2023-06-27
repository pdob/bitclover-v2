import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type MainParamsList = {
  Home: undefined
  Markets: undefined
  Favourites: undefined
  Exchanges: undefined
  Settings: undefined
}

export type AppStackParamsList = {
  Main: undefined
  CoinInfo: { coinId: string, coinName: string, coinImage: string }
  Privacy: undefined
  Terms: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T>

export type MainScreenProps<T extends keyof MainParamsList> =
  NativeStackScreenProps<MainParamsList, T>
