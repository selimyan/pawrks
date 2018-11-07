import React, { Component } from 'react'
import { StyleSheet, TextInput, ScrollView, Alert } from 'react-native'
import { ButtonGroup, Button, CheckBox } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo'
import { db, app } from '../config'
import "@expo/vector-icons"

export const addUser = (user) => {
  db.ref('/pets').push({ user })
}

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ownerName: '',
      petName: '',
      email: '',
      gender: 1,
      size: 1,
      age: '',
      breed: '',
      zip: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.chooseImage = this.chooseImage.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  async chooseImage() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
    let result = await ImagePicker.launchImageLibraryAsync()
    if (!result.cancelled) {
      try {
        await this.uploadImage(result.uri)
        Alert.alert('Uploaded')
      } catch (err) { Alert.alert(err) }
    }
  }

  async uploadImage(uri) {
    const response = await fetch(uri)
    const blob = await response.blob()
    let ref = app.storage().ref().child(`images/${blob._data.blobId}`)
    console.log('blob data', blob._data)
    return ref.put(blob)
  }

  handleSubmit() {
    const userEmail = app.auth().currentUser.email
    addUser({ ...this.state, email: userEmail })
    this.props.navigation.navigate('HomeScreen')
  }

  render() {
    const { ownerName, email, petName, gender, size, age, breed, zip, isDiscoverable } = this.state

    return (
      <ScrollView contentContainerStyle={styles.main} keyboardShouldPersistTaps='never' keyboardDismissMode='on-drag'>
        <TextInput
          style={styles.inputs}
          placeholder='Your Name'
          value={ownerName}
          onChangeText={(text) => this.setState({ ownerName: text })}
        />
        <TextInput
          style={styles.inputs}
          placeholder='Paw Name'
          value={petName}
          onChangeText={(text) => this.setState({ petName: text })}
        />
        <ButtonGroup
          selectedButtonStyle={{ backgroundColor: '#FF9F1C' }}
          onPress={(idx) => this.setState({ gender: idx })}
          selectedIndex={gender}
          buttons={['Male', 'Female']}
          style={styles.container}
        />
        <ButtonGroup
          selectedButtonStyle={{ backgroundColor: '#FF9F1C' }}
          onPress={(idx) => this.setState({ size: idx })}
          selectedIndex={size}
          buttons={['Small', 'Medium', 'Large']}
          style={styles.container}
        />
        <TextInput
          style={styles.inputs}
          placeholder='Age'
          keyboardType='number-pad'
          value={age}
          onChangeText={(text) => this.setState({ age: text })}
        />
        <TextInput
          style={styles.inputs}
          placeholder='Breed'
          value={breed}
          onChangeText={(text) => this.setState({ breed: text })}
        />
        <TextInput
          style={styles.inputs}
          placeholder='Zip'
          keyboardType='number-pad'
          value={zip}
          onChangeText={(text) => this.setState({ zip: text })}
        />
        <Button title='Choose image' onPress={this.chooseImage} />
        <CheckBox
          iconRight
          title='Paws can find me'
          name='isDiscoverable'
          checked={isDiscoverable}
          onPress={() => this.setState({ isDiscoverable: !isDiscoverable })}
        />
        <Button
          buttonStyle={styles.button}
          onPress={this.handleSubmit}
          title="Save Pawfile"
          backgroundColor="#2EC4B6"
        />
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  inputs: {
    height: 40,
    width: 300,
    padding: 4,
    margin: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2EC4B6',
    borderRadius: 10,
  },
  button: {
    height: 45,
    width: 300,
    backgroundColor: '#2EC4B6',
    borderRadius: 10,
    margin: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
})
