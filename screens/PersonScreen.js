import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import { useNavigation } from '@react-navigation/native'
import MovieList from '../components/movieList'
import Loading from '../components/loading'

var { width, height } = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const verticalMargin = ios ? '' : ' my-3'

const PersonScreen = () => {
  const navigation = useNavigation()
  const [isFavorite, toggleFavorite] = useState(false)
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5])
  const [loading, setLoading] = useState(false)

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
                source={require('../assets/tom2.jpeg')}
                style={{ width: width * 0.74, height: height * 0.43 }}
              />
            </View>
          </View>
          <View className='mt-6'>
            <Text className='text-3xl text-white font-bold text-center'>
              Tom Holland
            </Text>
            <Text className='text-base text-neutral-500 text-center'>
              London, United Kingdom
            </Text>
            <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
              <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <Text className='text-white font-semibold'>Gender</Text>
                <Text className='text-neutral-300 text-sm'>Male</Text>
              </View>
              <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <Text className='text-white font-semibold'>Birthday</Text>
                <Text className='text-neutral-300 text-sm'>1964-09-02</Text>
              </View>
              <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <Text className='text-white font-semibold'>Known for</Text>
                <Text className='text-neutral-300 text-sm'>Spider-men</Text>
              </View>
              <View className='px-2 items-center'>
                <Text className='text-white font-semibold'>Popularity</Text>
                <Text className='text-neutral-300 text-sm'>64.23</Text>
              </View>
            </View>
            <View className='my-6 mx-4 space-y-2'>
              <Text className='text-white text-lg'>Biography</Text>
              <Text className='text-neutral-400 tracking-wide'>
                Thomas Stanley Holland is an English actor. His accolades
                include a British Academy Film Award and three Saturn Awards.
                Some publications have called him one of the most popular actors
                of his generation.
                {'\n\n'}
                Born in London and raised in Kingston upon Thames, Holland
                developed an early passion for acting. He made his stage debut
                in the West End production of Billy Elliot the Musical in 2008
                and his film debut in the drama The Impossible in 2012. He began
                to attend hip-hop classes at the Nifty Feet Dance Studio, whose
                owner is Lynne Page.
              </Text>
            </View>

            {/* movies */}
            <MovieList
              title='Movies'
              data={personMovies}
              hideSeelAll={true}
              poster={require('../assets/tomm.jpeg')}
              movieName={'Cherry'}
            />
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default PersonScreen
