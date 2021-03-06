import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import MetricCard from './MetricCard'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import TextButton from './TextButton'

class EntryDetail extends Component {
  setTitle = (entryId) => {
    this.props.navigation.setOptions({
      title: entryId.split('-').join('/')
    })
  }

  reset = () => {
    const { remove, goBack, entryId } = this.props

    remove()
    goBack()
    removeEntry(entryId)
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }

  render() {
    const { entryId, metrics } = this.props
    this.setTitle(entryId)

    return (
      <View style={styles}>
        <MetricCard metrics={metrics} />
        <TextButton onPress={this.reset} style={{margin: 20}}>
          RESET
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  }
})

function mapStateToProps (state, { route }) {
  const { entryId } = route.params

  return {
    entryId,
    metrics: state[entryId]
  }
}

function mapDispatchToProps (dispatch, { route, navigation }) {
  const { entryId } = route.params

  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyReminderValue()
        : null
    })),
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)