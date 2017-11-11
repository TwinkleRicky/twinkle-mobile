import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Calendar} from 'react-native-calendars'
import {Button, ScrollContainer} from '../styles'
import {green} from '../styles/constants'
import {setSchedules, loadCalendar} from '../redux/actions/scheduleActions'
import {handleError} from '../helpers/errorHelpers'
import {connect} from 'react-redux'

class Scheduler extends Component {
  static propTypes = {
    loadCalendar: PropTypes.func,
    markedDates: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    setSchedules: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      markedDates: {}
    }
    this.onCancel = this.onCancel.bind(this)
    this.onSchedule = this.onSchedule.bind(this)
    this.onDayPress = this.onDayPress.bind(this)
  }

  componentWillMount() {
    const {loadCalendar} = this.props
    loadCalendar().catch(error => handleError({error}))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.markedDates !== this.props.markedDates) {
      this.setState({markedDates: this.props.markedDates})
    }
  }

  render() {
    const {markedDates} = this.state
    return (
      <ScrollContainer>
        <Calendar
          current={Date()}
          onDayPress={this.onDayPress}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: green
          }}
        />
        <Button
          success
          title="Schedule"
          onPress={this.onSchedule}
          style={{marginTop: 20}}
        />
        <Button
          warning
          title="Cancel"
          onPress={this.onCancel}
          style={{marginTop: 10}}
        />
      </ScrollContainer>
    )
  }

  onCancel() {
    const {navigation} = this.props
    navigation.goBack()
  }

  onSchedule() {
    const {navigation, setSchedules} = this.props
    const {markedDates} = this.state
    let selectedDates = []
    for (let key in markedDates) {
      if (markedDates[key].selected) selectedDates.push(key)
    }
    return setSchedules(selectedDates).then(
      () => navigation.goBack()
    ).catch(
      error => handleError({error, onPress: () => navigation.goBack()})
    )
  }

  onDayPress(day) {
    const {markedDates} = this.state
    this.setState({
      markedDates: {
        ...markedDates,
        [day.dateString]: {
          selected: markedDates[day.dateString] ? !markedDates[day.dateString].selected : true
        }
      }
    })
  }
}

export default connect(
  ({schedule}) => ({
    markedDates: schedule.markedDates
  }),
  {loadCalendar, setSchedules}
)(Scheduler)
