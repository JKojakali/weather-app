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
      let cityName = this.props.navigation.state.params.city;;

      let cityDetails = await OpenWeatherApi.Locations(cityName);

      let descriptionForToday = (cityDetails.currentDetailedDescription).charAt(0).toUpperCase() + cityDetails.currentDetailedDescription.slice(1);

      setTimeout(() => {
        this.setState({
          currentDailyHigh: cityDetails.currentDailyHigh,
          currentDailyLow: cityDetails.currentDailyLow,
          currentDescription: cityDetails.currentDescription,
          currentDetailedDescription: (cityDetails.currentDetailedDescription).charAt(0).toUpperCase() + cityDetails.currentDetailedDescription.slice(1),
          currentClouds: cityDetails.currentClouds,
          currentWindSpeed: cityDetails.currentWindSpeed,

          tomorrowDailyHigh: cityDetails.tomorrowDailyHigh,
          tomorrowDailyLow: cityDetails.tomorrowDailyLow,
          tomorrowDescription: cityDetails.tomorrowDescription,
          tomorrowDetailedDescription: (cityDetails.tomorrowDetailedDescription).charAt(0).toUpperCase() + cityDetails.tomorrowDetailedDescription.slice(1),
          tomorrowClouds: cityDetails.tomorrowClouds,
          tomorrowWindSpeed: cityDetails.tomorrowWindSpeed,

          country: cityDetails.country,
          iconUrlForToday: cityDetails.iconUrlForToday,
          iconUrlForTomorrow: cityDetails.iconUrlForTomorrow,
          loading: false
        })
      }, 750);

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
              <Text style={[styles.tabText, this.state.today === true ? styles.selectedTabText : null] }>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tomorrowTab, this.state.tomorrow === true ? styles.focusedContainer : null]} onPress={() => this.onDayButton('Tomorrow')}>
              <Text style={[styles.tabText, this.state.tomorrow === true ? styles.selectedTabText : null]}>Tomorrow</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContiner}>
          <Image style={styles.image} source={{uri:`${image}`}} />
        </View>
        <View style={styles.extraInfoContainer}>
          <Text textAlign='left' style={styles.extraInfoDescription}>City: <Text style={styles.extraInfo}>{this.props.navigation.state.params.city}</Text></Text>
          <Text textAlign='left' style={styles.extraInfoDescription}>Daily High: <Text style={styles.extraInfo}>{high}</Text></Text>
          <Text textAlign='left' style={styles.extraInfoDescription}>Daily Low: <Text style={styles.extraInfo}>{low}</Text></Text>
          <Text textAlign='left' style={styles.extraInfoDescription}>Wind Speed: <Text style={styles.extraInfo}>{windSpeed} MPH</Text></Text>
          <Text textAlign='left' style={styles.extraInfoDescription}>Cloud Coverage: <Text style={styles.extraInfo}>{clouds}%</Text></Text>
          <Text textAlign='left' style={styles.extraInfoDescription}>Description: <Text style={styles.extraInfo}>{description}</Text></Text>
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
    width: '100%',
    marginBottom: 50
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    flex: 2,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  focusedContainer: {
    backgroundColor: 'white'
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
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  tomorrowTab: {
    width: '100%',
    height: 40,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    color: 'white',
    fontSize: 20,
  },
  selectedTabText: {
    color: '#5FCFFA',
    fontSize: 20,
  },
  backButton: {
    color: 'white',
    textAlign: 'left',
    fontSize: 25,
    marginLeft: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 125,
    width: 125,
    marginTop: 100,
  },
  extraInfoContainer: {
    marginTop: 50,
    marginHorizontal: 10,
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: 40,
  },
  extraInfoDescription: {
    color: 'white',
    fontSize: 25,
    margin: 10,
    fontWeight: 'bold'
  },
  extraInfo: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    marginLeft: 10,
    fontWeight: '300'
  },
});