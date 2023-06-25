import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
//import the hero icons library
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline'
import { styles } from '../theme'
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/movieList'

//created this variable to identify what OS the user is on.
const iOS = Platform.OS === 'ios'
function HomeScreen() {
  //created a variable to store the trending movies data
  const [trending, setTrending] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [upcoming, setUpcoming] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [rated, setRated] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  return (
    <View className='flex-1 bg-neutral-800'>
      {/* Search bar and logo */}
      <SafeAreaView className={iOS ? 'mb-2 mt-2' : 'mb-2 mt-2'}>
        <StatusBar style='light' />
        <View className='flex-row justify-between items-center mx-4'>
          <Bars3CenterLeftIcon size='30' color='white' strokeWidth={2} />
          <Text className='text-white text-3xl font-bold'>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size='30' color='white' strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Movie list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Trending Movies carousel */}
        <TrendingMovies data={trending} />

        {/* Upcoming Movies carousel */}
        <MovieList
          title='Upcoming'
          data={upcoming}
          poster={require('../assets/creed.jpg')}
          movieName={'Creed III'}
        />

        {/* Upcoming Movies carousel */}
        <MovieList
          title='Top Rated'
          data={rated}
          movieName={'John Wick: Chapter 4'}
          poster={require('../assets/john.jpg')}
        />
      </ScrollView>
    </View>
  )
}

export default HomeScreen