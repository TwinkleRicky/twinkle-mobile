import React from 'react'
import {Button} from 'react-native'
import Login from './containers/Login'
import Home from './containers/Main/Home'
import Profile from './containers/Main/Profile'
import Scheduler from './containers/Scheduler'
import Splash from './containers/Splash'
import {StackNavigator, TabNavigator} from 'react-navigation'

const routes = StackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: false
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: false
    }
  },
  Main: {
    screen: TabNavigator({
      Home: {
        screen: Home,
        navigationOptions: {
          title: 'Home'
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: 'Profile'
        }
      }
    }, {
      animationEnabled: true,
      tabBarOptions: {
        showLabel: false,
        activeTintColor: '#e91e63'
      }
    })
  },
  Scheduler: {
    screen: Scheduler,
    navigationOptions: ({navigation}) => ({
      title: 'Scheduler',
      headerRight:
        <Button
          title="New"
          onPress={() => navigation.navigate('Profile')}
        />
    })
  }
})

export default routes
