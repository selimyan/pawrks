import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={styles.button}
          title='Parks'
          onPress={() => this.props.navigation.navigate('ParksScreen')}
        />
        <Button
          buttonStyle={styles.button}
          title='Paws'
          onPress={() => this.props.navigation.navigate('PetsScreen')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#2EC4B6",
    width: 250,
    height: 45,
    borderWidth: 0,
    borderRadius: 10,
    margin: 15
  }
})
