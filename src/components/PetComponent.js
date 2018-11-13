import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export default class PetComponent extends Component {
  static propTypes = {
    pets: PropTypes.array.isRequired
  }

  render() {
    const { pets, navigate } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Paws Near Me</Text>
        <ScrollView
          contentContainerStyle={styles.pets}
          showsVerticalScrollIndicator={false}
        >
          {pets.map((pet, index) => {
            return (
              <View style={styles.petCard} key={index}>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => navigate('SinglePetScreen', { pet, navigate })}>
                  <Image style={styles.petImage} source={{ uri: pet.imageUrl }} />
                  <Text style={styles.petName}>{pet.petName}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
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
    alignItems: 'center'
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  pets: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginVertical: 20,
    paddingBottom: 20,
  },
  petCard: {
    width: 250,
    height: 250,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#FF9F1C',
    borderWidth: 2,
  },
  petName: {
    fontSize: 26,
    color: '#2EC4B6',
    fontWeight: 'bold'
  }
})
