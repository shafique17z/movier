import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import MovieScreen from '../screens/MovieScreen'
import PersonScreen from '../screens/PersonScreen'

const stack = createNativeStackNavigator()

export default function AppNavPigation() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name='Home'
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <stack.Screen
          name='Movie'
          options={{ headerShown: false }}
          component={MovieScreen}
        />
        <stack.Screen
          name='Person'
          options={{ headerShown: false }}
          component={PersonScreen}
        />
      </stack.Navigator>
    </NavigationContainer>
  )
}
