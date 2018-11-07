import React from 'react';
import { 
  StyleSheet,
  Text,
  View, 
  Image, 
  TouchableOpacity,
  Dimensions
} from 'react-native';

import OpenWeatherApi from '../api/OpenWeatherApi';
import LoadingScreen from './LoadingComponent';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props); 

    this.state = {
      today: true,
      tomorrow: false,

      currentDailyHigh: null,
      currentDailyLow: null,
      currentDescription: null,
      currentDetailedDescription: null,
      currentClouds: null,
      currentWindSpeed: null,

      tomorrowDailyHigh: null,
      tomorrowDailyLow: null,
      tomorrowDescription: null,
      tomorrowDetailedDescription: null,
      tomorrowClouds: null,
      tomorrowWindSpeed: null,

      country: null,
      timeUpdated: null,
      loading: true,
      iconUrlForToday: null,
      iconUrlForTomorrow: null,
    }
  };

  componentDidMount = async () => {
    try {
      let cityName = this.props.navigation.state.params.city;

      let cityDetails = await OpenWeatherApi.Locations(cityName);

      setTimeout(() => {
        this.setState({
          currentDailyHigh: cityDetails.currentDailyHigh,
          currentDailyLow: cityDetails.currentDailyLow,
          currentDescription: cityDetails.currentDescription,
          currentDetailedDescription: cityDetails.currentDetailedDescription,
          currentClouds: cityDetails.currentClouds,
          currentWindSpeed: cityDetails.currentWindSpeed,

          tomorrowDailyHigh: cityDetails.tomorrowDailyHigh,
          tomorrowDailyLow: cityDetails.tomorrowDailyLow,
          tomorrowDescription: cityDetails.tomorrowDescription,
          tomorrowDetailedDescription: cityDetails.tomorrowDetailedDescription,
          tomorrowClouds: cityDetails.tomorrowClouds,
          tomorrowWindSpeed: cityDetails.tomorrowWindSpeed,

          country: cityDetails.country,
          iconUrlForToday: cityDetails.iconUrlForToday,
          iconUrlForTomorrow: cityDetails.iconUrlForTomorrow,
          loading: false
        })
      }, 500);

      // Not the proper way I'd like to handle this, but due to the time constraint I did it this way.

      if(cityDetails === 1) {
        this.props.navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.error(error)
    }
  }

  onDayButton = (day) => {
    if (day === 'Today') {
      this.setState({
        today: true,
        tomorrow: false
      });
    } else if (day === 'Tomorrow') {
      this.setState({
        today: false,
        tomorrow: true
      });
    };
  }

  onGoBackButtonPress = () => {
    this.props.navigation.navigate('HomeScreen');
  }

  render() {
    let low;
    let high;
    let description;
    let image;
    let clouds;
    let windSpeed;

    if(this.state.today === true) {
      high = this.state.currentDailyHigh;
      low = this.state.currentDailyLow;
      description = this.state.currentDetailedDescription;
      image = this.state.iconUrlForToday;
      clouds = this.state.currentClouds;
      windSpeed = this.state.currentWindSpeed;
    } else {
      high = this.state.tomorrowDailyHigh;
      low = this.state.tomorrowDailyLow;
      description = this.state.tomorrowDetailedDescription;
      image = this.state.iconUrlForTomorrow;
      clouds = this.state.tomorrowClouds;
      windSpeed = this.state.tomorrowWindSpeed;
    }

    return (
      <View style={styles.rootContainer}>
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={this.onGoBackButtonPress}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dayContainer}>
          <View style={styles.todayTomorrowContainer}>
            <TouchableOpacity style={[styles.todayTab, this.state.today === true ? styles.focusedContainer : null]} onPress={() => this.onDayButton('Today')}>
              <Text style={styles.todayText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tomorrowTab, this.state.tomorrow === true ? styles.focusedContainer : null]} onPress={() => this.onDayButton('Tomorrow')}>
              <Text style={styles.tomorrowText} >Tomorrow</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContiner}>
          <Image style={styles.image} source={{uri:`${image}`}} />
        </View>
        <View style={styles.highAndLowContainer}>
          <Text style={styles.highTempText}>{high}°</Text>
          <Text style={styles.lowTempText}>{low}°</Text>
        </View>
        <View style={styles.extraInfoContainer}>
          <Text style={styles.extraInfo}>Description: {description}</Text>
          <Text style={styles.extraInfo}>Wind Speed: {windSpeed} MPH</Text>
          <Text style={styles.extraInfo}>Cloud Coverage: {clouds} %</Text>
        </View>
        {this.state.loading === true ? <LoadingScreen visible={true}/> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#5FCFFA',
    paddingTop: 75
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%'
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  focusedContainer: {
    backgroundColor: '#54B8FB'
  },
  todayTomorrowContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
  },
  todayTab: {
    width: '100%',
    height: 40,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    justifyContent: 'center',
    flex: 1,
    marginRight: 20
  },
  tomorrowTab: {
    width: '100%',
    height: 40,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    justifyContent: 'center',
    flex: 1,
    marginLeft: 20
  },
  todayText: {
    color: 'black',
    fontSize: 20,
  },
  tomorrowText: {
    color: 'black',
    fontSize: 20,
  },
  backButton: {
    color: 'white',
    textAlign: 'left',
    fontSize: 25,
    marginLeft: 20,
    marginBottom: 20
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 125,
    width: 125,
    marginTop: 75
  },
  highTempText: {
    color: '#B85C6F',
    fontSize: 90,
    marginTop: 15
  },
  lowTempText: {
    color: '#3573FC',
    fontSize: 90
  },
  extraInfoContainer: {
    marginTop: 60
  },
  extraInfo: {
    color: 'white',
    fontSize: 30
  },
});