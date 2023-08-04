import { View, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'
import { theme } from '../theme'

const { width, height } = Dimensions.get('window')

const Loading = () => {
  return (
    <View
      style={{ width, height }}
      className='absolute flex-row justify-center items-center'
    >
      <Progress.CircleSnail thickness={8} size={100} color={theme.background} />
    </View>
  )
}

export default Loading
