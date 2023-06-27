import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import { LinearGradient as Gradient } from 'expo-linear-gradient'
import Cast from '../components/cast'
import MovieList from '../components/movieList'

const ios = Platform.OS == 'ios'
const topMargin = ios ? '' : ' mt-3'
var { width, height } = Dimensions.get('window')

export default function MovieScreen() {
  let movieName = 'Spider-Man: Across the Spider-Verse'
  const { params: item } = useRoute()
  const navigation = useNavigation()
  const [cast, setCast] = useState([1, 2, 3, 4, 5])
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5])
  const { isFavorite, toggleFavorite } = useState(false)

  useEffect(() => {
    //call api to get movie details
  }, [item])

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 100 }}
      className='flex-1 bg-neutral-900'
    >
      {/* back button and movie poster */}

      <View className='w-full'>
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row justify-between items-center px-4 ' +
            topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className='rounded-xl p-1'
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
            <HeartIcon
              size='35'
              color={isFavorite ? theme.background : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require('../assets/poster.jpg')}
            style={{
              width,
              height: height * 0.55,
            }}
          />
          <Gradient
            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
            style={{
              width,
              height: height * 0.55,
              position: 'absolute',
              bottom: 0,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>
      </View>

      {/* Movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className='space-y-3'>
        {/* Movie title */}
        <Text className='text-white text-center text-3xl font-bold tracking-wider'>
          {movieName}
        </Text>
        {/* Now some insights about movie like release date and cast wagera */}
        <Text className='text-neutral-400 text-center font-semibold text-base'>
          2023 ‧ RELEASED ‧ 2h 16m
        </Text>

        {/* genres */}
        <View className='flex-row justify-center mx-4 space-x-2'>
          <Text className='text-neutral-400 text-center font-semibold text-base'>
            Action ‧
          </Text>
          <Text className='text-neutral-400 text-center font-semibold text-base'>
            Adventure ‧
          </Text>
          <Text className='text-neutral-400 text-center font-semibold text-base'>
            Sci-fi
          </Text>
        </View>

        {/* description */}
        <Text className='text-neutral-400 mx-4 tracking-wide text-center'>
          After reuniting with Gwen Stacy, Brooklyn's full-time, friendly
          neighborhood Spider-Man is catapulted across the Multiverse, where he
          encounters a team of Spider-People charged with protecting its very
          existence. However, when the heroes clash on how to handle a new
          threat, Miles finds himself pitted against the other Spiders. He must
          soon redefine what it means to be a hero so he can save the people he
          loves most.
        </Text>
      </View>

      {/* Cast */}
      <Cast cast={cast} navigation={navigation} />

      {/* Similar movies under movie screen using the movieList component */}
      <MovieList
        title='Similar Movies'
        data={similarMovies}
        hideSeelAll={true}
        poster={require('../assets/vin.jpg')}
        movieName={'Fast X'}
      />
    </ScrollView>
  )
}
