const defaultState = {
  user: {},
  isAuthenticated: null
}

export default function scheduleReducer(state = defaultState, action) {
  switch (action.type) {
    case 'AUTH_LOGIN_SUCCESS':
      return ({
        ...state,
        user: action.user,
        isAuthenticated: true
      })
    case 'AUTH_LOGIN_FAIL':
      return ({
        ...state,
        isAuthenticated: false
      })
    case 'AUTH_LOGOUT':
      return ({
        ...state,
        user: {},
        isAuthenticated: false
      })
    default: return state
  }
}
