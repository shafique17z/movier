import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles } from '../theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import MovieList from '../components/movieList'
import Loading from '../components/loading'
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from '../api/moviedb'

var { width, height } = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const verticalMargin = ios ? '' : ' my-3'

const PersonScreen = () => {
  const navigation = useNavigation()
  const [isFavorite, toggleFavorite] = useState(false)
  const [personMovies, setPersonMovies] = useState([])
  const [person, setPerson] = useState({})
  const [loading, setLoading] = useState(false)
  const { params: item } = useRoute()

  useEffect(() => {
    setLoading(true)
    getPersonDetails(item.id)
    getPersonMovies(item.id)
  }, [item])

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id)
    // console.log('got Person:\n', data)
    setLoading(false)
    if (data) setPerson(data)
  }

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id)
    console.log('got Person Movie:\n', data)
    setLoading(false)
    if (data && data.cast) setPersonMovies(data.cast)
  }

  return (
    <ScrollView
      className='flex-1 bg-neutral-900'
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button and heart icon*/}
      <SafeAreaView
        className={
          'z-20 w-full flex-row justify-between items-center px-4 ' +
          verticalMargin
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

      {/* person details */}

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className='flex-row justify-center'
            style={{
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className='items-center rounded-full overflow-hidden h-64 w-64 border-neutral-500 border-2'>
              <Image
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                style={{ width: width * 0.74, height: height * 0.43 }}
              />
            </View>
          </View>
          <View className='mt-6'>
            <Text className='text-3xl text-white font-bold text-center'>
              {person?.name || 'N/A'}
            </Text>
            <Text className='text-base text-neutral-500 text-center'>
              {person?.place_of_birth || 'N/A'}
            </Text>
            <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
              <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <Text className='text-white font-semibold'>Gender</Text>
                <Text className='text-neutral-300 text-sm'>
                  {person?.gender == 1 ? 'Female' : 'Male' || 'N/A'}
                </Text>
              </View>
              <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <Text className='text-white font-semibold'>Birthday</Text>
                <Text className='text-neutral-300 text-sm'>
                  {person?.birthday || 'N/A'}
                </Text>
              </View>
              <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <Text className='text-white font-semibold'>Known for</Text>
                <Text className='text-neutral-300 text-sm'>
                  {person?.known_for_department || 'N/A'}
                </Text>
              </View>
              <View className='px-2 items-center'>
                <Text className='text-white font-semibold'>Popularity</Text>
                <Text className='text-neutral-300 text-sm'>
                  {person?.popularity?.toFixed(2) || 'N/A'}%
                </Text>
              </View>
            </View>
            <View className='my-6 mx-4 space-y-2'>
              <Text className='text-white text-lg'>Biography</Text>
              <Text className='text-neutral-400 tracking-wide'>
                {person?.biography || 'N/A'}
              </Text>
            </View>

            {/* movies */}
            <MovieList title='Movies' data={personMovies} hideSeelAll={true} />
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default PersonScreen
