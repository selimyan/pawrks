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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>Paws Near Me</Text>
        <ScrollView contentContainerStyle={styles.pets}>
          {pets.map((pet, index) => {
            return (
              <View style={styles.petCard} key={index}>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => navigate('SinglePetScreen', { pet })}>
                  <Image style={styles.petImage} source={{ uri: pet.imageUrl }} />
                  <Text style={styles.petName}>{pet.petName}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
      </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  pets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginVertical: 20
  },
  petCard: {
    width: 150,
    height: 150,
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  petImage: {
    width: 110,
    height: 110,
    borderRadius: 50,
    borderColor: '#FF9F1C',
    borderWidth: 2,
  },
  petName: {
    fontSize: 18,
    color: '#2EC4B6',
    fontWeight: 'bold'
  }
})
