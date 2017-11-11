import {Alert} from 'react-native'

export const handleError = ({error, onPress = () => null}) => {
  return Alert.alert(
    'Error',
    `There was an error: ${error}`,
    [{text: 'Ok', onPress: onPress}]
  )
}
