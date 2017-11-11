import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Alert, StyleSheet, View} from 'react-native'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'
import {initializeApp} from '../redux/actions/authActions'
import {blue} from '../styles/constants'
import {NavigationActions} from 'react-navigation'

class Splash extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    initializeApp: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  componentWillMount() {
    const {navigation} = this.props
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Login'})
      ]
    })
    setTimeout(() => this.props.initializeApp().catch(error => {
      Alert.alert(
        'Error',
        `There was an error: ${error}`,
        [{text: 'Ok', onPress: () => navigation.dispatch(resetAction)}]
      )
    }), 2000)
  }

  componentWillReceiveProps(nextProps) {
    const {navigation} = this.props
    const nextRoute = nextProps.isAuthenticated ? 'Main' : 'Login'
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: nextRoute})
      ]
    })
    navigation.dispatch(resetAction)
  }

  render() {
    const {container, text} = styles
    return (
      <View style={container}>
        <Animatable.Text
          style={text}
          duration={2500}
          animation="bounceIn"
          easing="linear"
        >
          Twinkle
        </Animatable.Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: blue
    },
    text: {
      fontSize: 50,
      color: '#fff'
    }
})

export default connect(({auth}) => ({isAuthenticated: auth.isAuthenticated}), {initializeApp})(Splash)
