import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/store'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'

const App = () => {
  return (
     <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  )
}

export default App