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
import { fallbackMoviePoster, image185 } from '../api/moviedb'

var { width, height } = Dimensions.get('window')

export default function MovieList({ title, data, hideSeeAll }) {
  const navigation = useNavigation()

  return (
    <View className='mb-8 spacy-y-4'>
      {/* Container for upcoming movies titles and see all button */}
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-lg'>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className='text-lg'>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* now adding scroll view to show horizontal list of movies */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 6 }}
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
                  // source={require('../assets/5.jpeg')}
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  className='rounded-xl'
                  style={{ width: width * 0.3, height: height * 0.22 }}
                />
                <Text className='text-neutral-300 text-center'>
                  {item.title.length > 15
                    ? item.title.slice(0, 15) + '...'
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
    </View>
  )
}
