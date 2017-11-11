import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, FormControl, Text, TextInput} from '../../styles'
import {Alert, View} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {login} from '../../redux/actions/authActions'
import {connect} from 'react-redux'
import {handleError} from '../../helpers/errorHelpers'

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    const {username, password} = this.state
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          paddingHorizontal: 50,
          justifyContent: 'center'
        }}
      >
        <Text h4 style={{marginBottom: 56}}>Sign In to Twinkle</Text>
        <View style={{marginBottom: 50}}>
          <FormControl>
            <TextInput
              placeholder="Enter Username"
              value={username}
              onChangeText={text => this.setState({username: text})}
            />
          </FormControl>
          <FormControl>
            <TextInput
              placeholder="Enter Password"
              value={password}
              onChangeText={text => this.setState({password: text})}
              secureTextEntry
            />
          </FormControl>
        </View>
        <Button
          info
          title="Login"
          onPress={this.onSubmit}
        />
      </View>
    )
  }

  onSubmit = async() => {
    const {login, navigation} = this.props
    const {username, password} = this.state
    const result = await login({username, password}).catch(error => handleError({error}))
    switch (result) {
      case 'success':
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Main'})
          ]
        })
        return navigation.dispatch(resetAction)
      case 'wrong username/password':
        return Alert.alert(
          'Wrong username or password',
          'The account with that username doesn\'t exist or you entered a wrong password. Please try again.',
          [{text: 'Try Again'}]
        )
      default: return
    }
  }
}

export default connect(
  null,
  {login}
)(Login)
