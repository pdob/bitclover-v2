import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'

export type MainParamsList = {
  Home: undefined
  CoinInfo: { coinId: string, coinName: string, coinImage: string }
}

export type ApplicationScreenProps<T> =
  NativeStackScreenProps<MainParamsList, T>
