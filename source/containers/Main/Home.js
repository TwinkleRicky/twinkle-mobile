import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Image, StyleSheet, View} from 'react-native'
import {Button} from '../../styles'
import Timeline from '../../components/Timeline'
import {connect} from 'react-redux'

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    schedules: PropTypes.array.isRequired
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../styles/images/calendar.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    )
  }

  render() {
    const {navigation, schedules} = this.props
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {schedules.length > 0 && <Timeline
            style={styles.list}
            data={schedules}
            circleSize={20}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{display: 'none'}}
            descriptionStyle={{color: 'gray'}}
            options={{
              style: {paddingTop: 5}
            }}
          />}
        </View>
        <Button
          info
          title="Schedule Visits"
          onPress={() => navigation.navigate('Scheduler')}
          style={{marginTop: 20}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  icon: {
    width: 26,
    height: 26
  },
  list: {
    flex: 1
  }
})

export default connect(
  state => ({
    schedules: state.schedule.schedules
  })
)(Home)
