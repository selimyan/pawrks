import React, { Component } from 'react'
import { StyleSheet, TextInput, ScrollView, Alert, KeyboardAvoidingView } from 'react-native'
import { ButtonGroup, Button, CheckBox } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo'
import { db, storage, app } from '../config'
import '@expo/vector-icons'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ownerName: '',
      petName: '',
      gender: 1,
      size: 1,
      age: '',
      breed: '',
      zip: '',
      imageUrl: '',
      isDiscoverable: false
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
    try {
      const response = await fetch(uri)
      const blob = await response.blob()
      const imageRef = storage.ref().child(`images/${blob._data.blobId}`)
      await imageRef.put(blob)
      const imageUrl = await imageRef.getDownloadURL()
      this.setState({ imageUrl })
    } catch (err) { Alert.alert(err) }
  }

  async handleSubmit() {
    const {
      ownerName,
      petName,
      gender,
      size,
      age,
      breed,
      zip,
      imageUrl,
      isDiscoverable
    } = this.state
    try {
      const email = await app.auth().currentUser.email
      const petId = await db.ref('/pets').push().key
      const ownerId = await db.ref('/users').push().key
      const petObj = {
        age,
        breed,
        gender,
        imageUrl,
        ownerName,
        ownerId,
        petId,
        petName,
        size
      }
      await db.ref(`/pets/${petId}`).set(petObj)
      const userObj = {
        email,
        userId: ownerId,
        userName: ownerName,
        zip,
        isDiscoverable,
      }
      await db.ref(`users/${ownerId}`).set(userObj)
      await db.ref(`users/${ownerId}/pets/${petId}`).set(petObj)
      this.props.navigation.navigate('HomeScreen')
    } catch (err) { Alert.alert(err) }
  }

  render() {
    const {
      ownerName,
      petName,
      gender,
      size,
      age,
      breed,
      zip,
      isDiscoverable
    } = this.state

    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps='never'
        keyboardDismissMode='on-drag'
      >
        <KeyboardAvoidingView
          style={styles.main}
          behavior='padding'
        >
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
            containerStyle={styles.buttonGroup}
            selectedButtonStyle={{ backgroundColor: '#FF9F1C' }}
            buttons={['Male', 'Female']}
            selectedIndex={gender}
            onPress={(idx) => this.setState({ gender: idx })}
          />
          <ButtonGroup
            containerStyle={styles.buttonGroup}
            selectedButtonStyle={{ backgroundColor: '#FF9F1C' }}
            buttons={['Small', 'Medium', 'Large']}
            selectedIndex={size}
            onPress={(idx) => this.setState({ size: idx })}
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
          <Button
            buttonStyle={styles.button}
            title='Upload Image'
            onPress={this.chooseImage}
          />
          <CheckBox
            // containerStyle={styles.button}
            // textStyle={{ color: '#FFFFFF', fontFamily: 'System' }}
            iconRight
            title='Paws can find me'
            name='isDiscoverable'
            checked={isDiscoverable}
            onPress={() => this.setState({ isDiscoverable: !isDiscoverable })}
          />
          <Button
            buttonStyle={styles.submit}
            title="Save Pawfile"
            backgroundColor="#2EC4B6"
            onPress={this.handleSubmit}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
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
  submit: {
    height: 45,
    width: 300,
    backgroundColor: '#2EC4B6',
    borderRadius: 10,
    margin: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonGroup: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2EC4B6',
    borderRadius: 10,
  },
  button: {
    height: 45,
    width: 300,
    backgroundColor: '#FF9F1C',
    borderRadius: 10,
    margin: 5,
    borderColor: '#2EC4B6',
  }
})
