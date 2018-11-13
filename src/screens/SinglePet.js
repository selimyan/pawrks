import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

const SinglePet = (props) => {
  const { pet, navigate } = props.navigation.state.params

  return (
    <View style={style.main}>
      <Text style={style.name}>{pet.petName}, {pet.age}</Text>
      <Image style={style.petImage} source={{ uri: pet.imageUrl }} />
      <View style={{ margin: 25 }}>
        <Text style={style.info}>I am a {pet.breed}</Text>
        <Text style={style.info}>My hooman is {pet.ownerName}</Text>
      </View>
      <Button
        buttonStyle={style.button}
        title='Message'
        onPress={() => navigate('MessageScreen')}
      />
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
