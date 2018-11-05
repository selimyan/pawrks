import React, { Component } from 'react'
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { db, app } from '../config'
import PetComponent from '../components/PetComponent'

export default class Pets extends Component {
  state = {
    user: {},
    pets: [],
    loading: true
  }

  async componentDidMount() {
    try {
      await app.auth().onAuthStateChanged((user) => {
        this.setState({ user })
      })
    } catch (error) { console.log('Auth error.', error) }

    try {
      db.ref('/users').on('value', async (snapshot) => {
        let owners = Object.values(snapshot.val())
        let petsToLoad = this.fetchNearbyPets(owners, this.state.user)
        this.setState({ loading: false, pets: petsToLoad })
      })
    } catch (error) { console.log('Error fetching pets', error) }

  }

  componentWillUnmount() {
    this.authSubscription()
  }

  fetchNearbyPets(owners, user) {
    let userProfile = owners.filter(owner =>
      owner.email === user.email)[0]
    let nearbyOwners = owners.filter(owner =>
      owner.zip === userProfile.zip && owner.email !== userProfile.email)
    let petsToLoad = []
    nearbyOwners.forEach(owner => { petsToLoad = petsToLoad.concat(Object.values(owner.pets)) })
    return petsToLoad
  }

  render() {
    // console.log('PETSSS', this.state.pets)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          !this.state.loading ?
            <PetComponent
              pets={this.state.pets}
              navigate={this.props.navigation.navigate}
            />
            : <ActivityIndicator />
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  }
})
