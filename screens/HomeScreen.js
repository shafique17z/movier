import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/moviedb'

//created this variable to identify what OS the user is on.
const iOS = Platform.OS === 'ios'

function HomeScreen() {
  //created a variable to store the trending movies data (temporary)
  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [rated, setRated] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies()
    // console.log('Get tredning movies data:\n', data)
    if (data && data.results) setTrending(data.results)
    setLoading(false)
  }

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies()
    // console.log('Got upcoming movies data:\n', data)
    if (data && data.results) setUpcoming(data.results)
  }
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies()
    console.log('Got top rated movies data:\n', data)
    if (data && data.results) setRated(data.results)
  }

  return (
    <View className='flex-1 bg-neutral-800'>
      {/* Search bar and logo */}
      <SafeAreaView className={iOS ? '' : 'my-2'}>
        <StatusBar style='light' />
        <View className='flex-row justify-between items-center mx-4'>
          <Bars3CenterLeftIcon size='30' color='white' strokeWidth={2} />
          <Text className='text-white text-3xl font-bold'>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size='30' color='white' strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        // Movie list
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 8 }}
        >
          {/* Trending Movies carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* Upcoming Movies carousel */}
          <MovieList title='Upcoming' data={upcoming} />

          {/* Top Rated Movies carousel */}
          <MovieList title='Top Rated (IMDb)' data={rated} />
        </ScrollView>
      )}
    </View>
  )
}

export default HomeScreen
