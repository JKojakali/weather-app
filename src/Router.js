import { createStackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import WeatherScreen from './components/WeatherScreen';

const Router = createStackNavigator({
  HomeScreen: {screen: HomeScreen},
  WeatherScreen: {screen: WeatherScreen},
  }, {
    headerMode: 'screen',
})

export default Router;