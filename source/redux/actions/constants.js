import {AsyncStorage} from 'react-native'

export const auth = async() => {
  const token = await AsyncStorage.getItem('token')
  return token ? {headers: {authorization: token}} : null
}
