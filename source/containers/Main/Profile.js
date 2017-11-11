import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Image, View, StyleSheet} from 'react-native'
import {Cell, Section, TableView} from 'react-native-tableview-simple'
import {NavigationActions} from 'react-navigation'
import {logout} from '../../redux/actions/authActions'
import {connect} from 'react-redux'

class Profile extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../styles/images/menu.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    )
  }

  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  render() {
    return (
      <View style={{backgroundColor: '#EFEFF4', flex: 1}}>
        <TableView>
          <Section>
            <Cell
              titleTextStyle={{
                textAlign: 'center'
              }}
              title="Log Out"
              titleTextColor="red"
              onPress={this.logout}
            />
          </Section>
        </TableView>
      </View>
    )
  }

  logout = async() => {
    const {logout, navigation} = this.props
    await logout()
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Login'})
      ]
    })
    navigation.dispatch(resetAction)
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
})

export default connect(
  null,
  {logout}
)(Profile)
