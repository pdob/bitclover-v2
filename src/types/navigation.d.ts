import { NavigatorScreenParams } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

export type MainParamsList = {
  Home: undefined;
};

export type ApplicationStackParamList = {
  Main: NavigatorScreenParams<MainParamsList>
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
