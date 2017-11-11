import request from 'axios'
import {formatDate} from '../../helpers/timeStampHelpers'
import {auth} from './constants'
import {URL} from '../../config'

export const loadCalendar = () => dispatch =>
request.get(`${URL}/schedule`).then(
  ({data}) => {
    let dateStamps = data.map(({dateStamp}) => dateStamp)
    let dateStrings = dateStamps.map(dateStamp => formatDate(dateStamp))
    dispatch({
      type: 'PLOT_SCHEDULES',
      dateStrings
    })
  }
).catch(
  error => Promise.reject(error)
)

export const getSchedules = () => async(dispatch) => {
  try {
    const {data} = await request.get(`${URL}/schedule`)
    dispatch({
      type: 'GET_SCHEDULES',
      schedules: data
    })
  } catch (error) {
    error => Promise.reject(error)
  }
}

export const setSchedules = selectedDates => async(dispatch) => {
  try {
    const token = await auth()
    await request.post(`${URL}/schedule`, {dates: selectedDates}, token)
    dispatch({
      type: 'PLOT_SCHEDULES',
      dateStrings: selectedDates
    })
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
