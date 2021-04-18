import 'react-native-gesture-handler'
// import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import  { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { pink, purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Constants from 'expo-constants'
import EntryDetail from './components/EntryDetail'

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator()

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size}) => {
    let iconName;
    if (route.name === 'History') {
      iconName = focused
        ? 'ios-bookmarks'
        : 'ios-bookmarks-outline'
      
      return <Ionicons name={iconName} size={30} color={color} />
    } else if (route.name === 'Add Entry') {
      iconName = focused
        ? 'plus-square'
        : 'plus-square-o'
      
      return <FontAwesome name={iconName} size={30} color={color} />
    }
  }
})

const tabNavigationOptions = {
    header: null
  }

const tabBarOptions = {
  activeTintColor: Platform.OS === 'ios' ? purple : white,
  style: {
    height: 56,
    backgroundColor: Platform.OS === 'ios' ? white : purple,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  }
}

const MainNavigator = createStackNavigator()

const stackScreenOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: purple
  }
}

function Home() {
  return (
    <Tab.Navigator
      initialRouteName='History'
      screenOptions={tabScreenOptions}
      tabBarOptions={tabBarOptions}
      navigationOptions={tabNavigationOptions}
    >
      <Tab.Screen name='History' component={History} />
      <Tab.Screen name='Add Entry' component={AddEntry} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator.Navigator
            initialRouteName='Home'
            screenOptions={stackScreenOptions}
          >
            <MainNavigator.Screen name='Home' component={Home} />
            <MainNavigator.Screen name='Entry Detail' component={EntryDetail} />
          </MainNavigator.Navigator>
        </View>
      </Provider>
    </NavigationContainer>
  );
}
