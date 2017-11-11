import React from 'react'
import PropTypes from 'prop-types'
import {connect, Provider} from 'react-redux'
import store from './store'
import {AppNavigator} from './source/redux/reducers/navReducer'
import {addNavigationHelpers} from 'react-navigation'

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
}
function App({dispatch, nav}) {
  return (
    <AppNavigator
      navigation={
        addNavigationHelpers({
          dispatch,
          state: nav
        })
      }
    />
  )
}

const AppWithNavState = connect(({nav}) => ({nav}))(App)

export default function Root() {
  return (
    <Provider store={store}>
      <AppWithNavState />
    </Provider>
  )
}
