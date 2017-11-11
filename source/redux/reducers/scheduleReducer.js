const defaultState = {
  markedDates: {},
  schedules: []
}

export default function scheduleReducer(state = defaultState, action) {
  switch (action.type) {
    case 'PLOT_SCHEDULES':
      return {
        ...state,
        markedDates: action.dateStrings.reduce((result, dateString) => {
          result[dateString] = {selected: true}
          return result
        }, {})
      }
    case 'GET_SCHEDULES':
      return {
        ...state,
        schedules: action.schedules
      }
    default: return state
  }
}
