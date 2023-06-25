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

const ios = Platform.OS == 'ios'
const topMargin = ios ? '' : ' mt-3'
var { width, height } = Dimensions.get('window')

export default function MovieScreen() {
  const { params: item } = useRoute()
  const navigation = useNavigation()
  const { isFavorite, toggleFavorite } = useState(false)

  useEffect(() => {
    //call api to get movie details
  }, [item])

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 1000 }}
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
            source={require('../assets/poster2.jpg')}
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
    </ScrollView>
  )
}
