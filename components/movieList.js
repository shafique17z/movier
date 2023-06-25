import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'

var { width, height } = Dimensions.get('window')

export default function MovieList({ title, data, poster, movieName }) {
  const navigation = useNavigation()

  return (
    <View className='mb-8 spacy-y-4'>
      {/* Container for upcoming movies titles and see all button */}
      <View className='mx-4 flex-row justify-between item-center'>
        <Text className='text-white text-xl'>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.text} className='text-lg'>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {/* now adding scroll view to show horizontal list of movies */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 15 }}
      >
        {/* Now we need to map through the data and display the movie cards */}
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate('Movie', item)}
            >
              <View className='space-y-2 mx-1.5 mt-2'>
                <Image
                  source={poster}
                  className='rounded-2xl'
                  style={{ width: width * 0.3, height: height * 0.22 }}
                />
                <Text className='text-neutral-300 ml-2'>
                  {movieName.length > 15
                    ? movieName.slice(0, 15) + '...'
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
    </View>
  )
}