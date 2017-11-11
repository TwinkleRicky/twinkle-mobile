import authReducer from './authReducer'
import navReducer from './navReducer'
import scheduleReducer from './scheduleReducer'
import {combineReducers} from 'redux'

export default combineReducers({
  auth: authReducer,
  nav: navReducer,
  schedule: scheduleReducer
})
