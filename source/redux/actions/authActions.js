import {Alert, AsyncStorage} from 'react-native'
import request from 'axios'
import {auth} from './constants'
import {URL} from '../../config'
import {processSchedules} from '../../helpers/dataHelpers'

export const initializeApp = () => async(dispatch) => {
  try {
    const token = await auth()
    if (!token) {
      return dispatch({
        type: 'AUTH_LOGIN_FAIL'
      })
    }
    const {data: {user}} = await request.get(`${URL}/user/parentSession`, token)
    dispatch({
      type: 'AUTH_LOGIN_SUCCESS',
      user
    })
    const {data: schedules} = await request.get(`${URL}/schedule`)
    return dispatch({
      type: 'GET_SCHEDULES',
      schedules: processSchedules(schedules)
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const login = ({username, password}) => async(dispatch) => {
  try {
    const {data} = await request.post(`${URL}/user/parentUser`, {username, password})
    if (data.success) {
      await AsyncStorage.setItem('token', data.token)
      dispatch({
        type: 'AUTH_LOGIN_SUCCESS',
        user: data.user
      })
      const {data: schedules} = await request.get(`${URL}/schedule`)
      dispatch({
        type: 'GET_SCHEDULES',
        schedules: processSchedules(schedules)
      })
      return 'success'
    }
  } catch (error) {
    if (error.response.status === 401) return 'wrong username/password'
    return Promise.reject(error)
  }
}

export const logout = () => async(dispatch) => {
  try {
    dispatch({
      type: 'AUTH_LOGOUT'
    })
    await AsyncStorage.removeItem('token')
  } catch (error) {
    Alert.alert(
      'Error',
      `There was an error: ${error}`,
      [{text: 'Ok'}]
    )
  }
}
