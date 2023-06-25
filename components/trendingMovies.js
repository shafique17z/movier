import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

export default function TrendingMovies({ data }) {
  const navigation = useNavigation()
  const handleClick = (item) => {
    navigation.navigate('Movie', item)
  }

  return (
    <View className='mb-8'>
      <Text className='text-white text-xl mx-4 mb-4'>Trending</Text>

      {/* Carousel configuration */}
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
        sliderWidth={width}
        itemWidth={width * 0.62}
      />
    </View>
  )
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={require('../assets/poster2.jpg')}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className='rounded-2xl'
      />
    </TouchableWithoutFeedback>
  )
}