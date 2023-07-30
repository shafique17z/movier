import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useCallback, useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { debounce } from 'lodash'
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb'

const { height, width } = Dimensions.get('window')

const SearchScreen = () => {
  const navigation = useNavigation()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true)
      searchMovies({
        query: value,
        include_adult: false,
        lanuage: 'en-US',
        page: '1',
      }).then((data) => {
        setLoading(false)
        // console.log('got movies:\n', data)
        if (data && data.results) setResults(data.results)
      })
    } else {
      setLoading(false)
      setResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  return (
    <SafeAreaView className='bg-neutral-800 flex-1 pt-3'>
      <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder='Search Movies'
          placeholderTextColor={'lightgrey'}
          className='pb-1 pl-5 flex-1 text-base font-semibold text-white'
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className='rounded-full p-1 m-2 bg-neutral-500'
        >
          <XMarkIcon size={20} color={'white'} />
        </TouchableOpacity>
      </View>

      {/* results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 14 }}
          className='space-y-3'
        >
          <Text className='text-white ml-1 font-bold italic'>
            Results ({results.length})
          </Text>
          <View className='flex-row flex-wrap justify-between'>
            {
              // results
              results.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.push('Movie', item)}
                  >
                    <View className='space-y-3 mb-4'>
                      <Image
                        className='rounded-xl'
                        // source={require('../assets/5.jpg')}
                        source={{
                          uri:
                            image185(item?.poster_path) || fallbackMoviePoster,
                        }}
                        style={{ width: width * 0.44, height: height * 0.3 }}
                      />
                      <Text className='text-neutral-300 ml-1'>
                        {item?.title.length > 22
                          ? item?.title.slice(0, 22) + '...'
                          : item?.title}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })
            }
          </View>
        </ScrollView>
      ) : (
        <View className='flex-row justify-center items-center'>
          <Image
            source={require('../assets/movieTime.png')}
            className='w-96 h-96'
          />
        </View>
      )}
    </SafeAreaView>
  )
}

export default SearchScreen
