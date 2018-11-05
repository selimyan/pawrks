import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

const SinglePet = (props) => {
  const pet = props.navigation.state.params.pet
  return (
    <View style={style.main}>
      <Text style={style.name}>{pet.user.petName}, {pet.user.age}y</Text>
      <Image style={style.petImage} source={{ uri: pet.user.image }} />
      <View style={{ margin: 25 }}>
        <Text style={style.info}>I am a {pet.user.breed}</Text>
        <Text style={style.info}>My hooman is {pet.user.ownerName}</Text>
      </View>
      <Button buttonStyle={style.button} title='Message' />
    </View>
  )
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  petImage: {
    width: 250,
    height: 250,
    margin: 5
  },
  name: {
    fontSize: 24,
    color: '#2EC4B6',
    fontWeight: 'bold',
    margin: 10
  },
  info: {
    fontSize: 16
  },
  button: {
    backgroundColor: "#2EC4B6",
    width: 100,
    height: 45,
    borderWidth: 0,
    borderRadius: 10,
    margin: 15
  },
})

export default SinglePet
