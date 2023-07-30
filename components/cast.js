import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {
  fallbackMoviePoster,
  fallbackPersonImage,
  image185,
} from '../api/moviedb'

export default function Cast({ cast, navigation }) {
  let personName = 'Tom Hull'
  let characterName = 'Peter Park'
  return (
    <View className='my-6'>
      <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className='mr-4 items-center'
                onPress={() => navigation.navigate('Person', person)}
              >
                <View className='rounded-full overflow-hidden h-20 w-20 items-center border-neutral-500'>
                  <Image
                    source={{
                      uri:
                        image185(person?.profile_path) || fallbackPersonImage,
                    }}
                    className='rounded-2xl h-24 w-20'
                  />
                </View>
                <Text className='text-white text-s mt-2'>
                  {person?.name.length > 10
                    ? person?.name.slice(0, 10) + '...'
                    : person?.name}
                </Text>
                <Text className='text-neutral-400 text-xs mt-1'>
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + '...'
                    : person?.character}
                </Text>
              </TouchableOpacity>
            )
          })}
      </ScrollView>
    </View>
  )
}
