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
import Loading from '../components/loading'
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from '../api/moviedb'

const ios = Platform.OS == 'ios'
const topMargin = ios ? '' : ' mt-3'
var { width, height } = Dimensions.get('window')

export default function MovieScreen() {
  const { params: item } = useRoute()
  const navigation = useNavigation()
  const [cast, setCast] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [isFavorite, toggleFavorite] = useState(false)
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({})

  useEffect(() => {
    // console.log('item id:', item.id)
    setLoading(true)
    getMovieDetails(item.id)
    getMovieCredits(item.id)
    getSimilarMovies(item.id)
  }, [item])

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id)
    // console.log('Similar movies:\n', data)
    if (data && data.results) setSimilarMovies(data.results)
  }

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id)
    // console.log(data)
    setLoading(false)
    if (data) setMovie(data)
  }

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id)
    // console.log('Credits:\n', data)
    if (data && data.cast) setCast(data.cast)
  }

  return (
    <ScrollView
      className='flex-1 bg-neutral-900'
      contentContainerStyle={{ paddingBottom: 8 }}
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
            <HeartIcon size='35' color={isFavorite ? 'red' : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          /* Movie poster */
          <View>
            <Image
              // source={require('../assets/5.jpg')}
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
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
        )}
      </View>

      {/* Movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className='space-y-3'>
        {/* Movie title */}
        <Text className='text-white text-center text-3xl font-bold tracking-wider'>
          {movie?.title?.length > 20
            ? movie?.title?.slice(0, 20) + '..'
            : movie?.title}
        </Text>
        {/* Now some insights about movie like release date and cast wagera */}
        {movie?.id ? (
          <Text className='text-neutral-400 text-center font-semibold text-base'>
            {movie?.release_date?.split('-')[0]} ‧ {movie?.status} ‧{' '}
            {movie?.runtime} mins
          </Text>
        ) : null}

        {/* genres */}
        <View className='flex-row justify-center mx-4 space-x-2'>
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length
            return (
              <Text
                key={index}
                className='text-neutral-400 text-center font-semibold text-base'
              >
                {' '}
                {genre?.name} {showDot ? '•' : null}
              </Text>
            )
          })}

          {/* <Text className='text-neutral-400 text-center font-semibold text-base'>
            Adventure 
          </Text>
          <Text className='text-neutral-400 text-center font-semibold text-base'>
            Sci-fi
          </Text> */}
        </View>

        {/* description */}
        <Text className='text-neutral-400 mx-4 tracking-wide'>
          {movie?.overview}
        </Text>
      </View>

      {/* Cast */}
      {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}

      {/* Similar movies under movie screen using the movieList component */}
      {similarMovies.length > 0 && (
        <MovieList
          title='Similar Movies'
          data={similarMovies}
          hideSeelAll={true}
        />
      )}
    </ScrollView>
  )
}
