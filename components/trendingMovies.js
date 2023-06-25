import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'

const { width, height } = Dimensions.get('window')
export default function TrendingMovies({ data }) {
  return (
    <View className='mb-8'>
      <Text className='text-white text-xl mx-4 mb-4'>Trending</Text>

      {/* Carousel configuration */}
      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard item={item} />}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
        sliderWidth={width}
        itemWidth={width * 0.62}
      />
    </View>
  )
}

const MovieCard = ({ item }) => {
  return (
    <TouchableWithoutFeedback>
      <Image
        source={require('../assets/poster2.jpg')}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className='rounded-2xl'
      />
    </TouchableWithoutFeedback>
  )
}
