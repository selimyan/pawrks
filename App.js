import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Home from './src/screens/Home'
import Signup from './src/screens/Signup'
import Pets from './src/screens/Pets'
import Parks from './src/screens/Parks'
import Login from './src/screens/Login'
import SinglePet from './src/screens/SinglePet'

const Root = createStackNavigator({
  LoginScreen: Login,
  HomeScreen: Home,
  SignupScreen: Signup,
  PetsScreen: Pets,
  ParksScreen: Parks,
  SinglePetScreen: SinglePet
}, {
    initialRouteName: 'LoginScreen'
  })

export default class App extends React.Component {
  render() {
    return (
      <Root />
    )
  }
}
