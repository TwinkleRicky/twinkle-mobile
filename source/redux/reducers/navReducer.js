import routes from '../../routes'
import {NavigationActions} from 'react-navigation'

export const AppNavigator = routes

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init())

export default function navReducer(state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  return nextState || state
}
