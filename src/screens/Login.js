import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image, KeyboardAvoidingView } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { app } from '../config'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    }
  }

  async onLoginPress() {
    this.setState({ error: '', loading: true })
    const { email, password } = this.state
    try {
      await app.auth().signInWithEmailAndPassword(email, password)
      this.setState({ error: '', loading: false })
      this.props.navigation.navigate('HomeScreen')
    } catch (error) {
      this.setState({ error: `Authentication failed. ${error}`, loading: false })
    }
  }

  async onSignupPress() {
    this.setState({ error: '', loading: true })
    const { email, password } = this.state
    try {
      await app.auth().createUserWithEmailAndPassword(email, password)
      this.setState({ error: '', loading: false })
      this.props.navigation.navigate('SignupScreen', { name: 'Pawfile' })
    } catch (error) {
      this.setState({ error: `Authentication failed. ${error}`, loading: false })
    }
  }

  renderButtonOrLoading() {
    return this.state.loading ?
      <ActivityIndicator size='small' />
      : <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button buttonStyle={styles.button} title='Login' onPress={this.onLoginPress.bind(this)} />
        <Button buttonStyle={styles.button} title='Sign Up' onPress={this.onSignupPress.bind(this)} />
      </View>
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.main} behavior='padding' enabled>
        <Image style={styles.image} source={require('../../assets/paws.png')} />
        <View >
          <FormLabel>Email</FormLabel>
          <FormInput
            value={this.state.email}
            autoCorrect={false}
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={email => this.setState({ email })}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            autoCorrect={false}
            autoCapitalize='none'
            value={this.state.password}
            secureTextEntry
            onChangeText={password => this.setState({ password })} />
          <Text style={styles.error}>{this.state.error}</Text>
        </View>
        {this.renderButtonOrLoading()}
        <View style={{ height: 60 }} />
      </KeyboardAvoidingView >
    )
  }
}

const styles = StyleSheet.create({
  error: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    backgroundColor: "#2EC4B6",
    width: 100,
    height: 45,
    borderWidth: 0,
    borderRadius: 10,
    margin: 10
  },
  main: {
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 40,
    width: '100%',
    height: '100%',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between'
  },
  image: {
    width: 400,
    marginBottom: 20,
    resizeMode: 'contain'
  }
})
