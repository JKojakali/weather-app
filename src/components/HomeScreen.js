import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView 
} from 'react-native';

let defaultCities = [
  'Atlanta',
  'New York',
  'Hoboken',
  'Newark',
  'Chicago',
]

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props); 

    this.state = {
      text: ''
    }
  };
  
  renderCities = () => {
    let cities = [];
    for(let i = 0; i < defaultCities.length; i++) {
      let cityName = defaultCities[i];

      cities.push(
        <TouchableOpacity style={styles.buttonContainer} key={cityName} onPress={() => this.onButtonPress(cityName)}>
          <Text style={styles.cities}>{cityName}</Text>
        </TouchableOpacity> 
      )
    };

    return cities;
  }

  onButtonPress = (city) => {
    this.props.navigation.navigate('WeatherScreen', {
      city
    });
  }

  onSubmitButtonPress = () => {
    let city = this.state.text;

    if(city.length !== 0) {
      this.props.navigation.navigate('WeatherScreen', {
        city
      });
    }

    return;
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <ScrollView style={styles.scrollViewContainer}>
          {this.renderCities()}
        </ScrollView>
        <View style={styles.textBoxContainer}>
          <Text style={styles.cityFinderText}>
            Can't find the city you're looking for? Try and look it up!
          </Text>
          <TextInput style={styles.textBox} onChangeText={(text) => this.setState({ text })}/>
          <TouchableOpacity style={styles.submitButtonContainer} onPress={this.onSubmitButtonPress}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5FCFFA'
  },
  scrollViewContainer: {
    marginTop: 50
  },
  textBoxContainer: {
    marginBottom: Dimensions.get('window').height/10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    height: 40,
    width: Dimensions.get('window').width/1.4,
    color: 'white',
    paddingLeft: 20,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    marginTop: 20
  },
  cityFinderText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 25,
    marginHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: Dimensions.get('window').height/16,
  },
  submitButtonContainer: {
    width: '100%',
    height: 40,
    width: Dimensions.get('window').width/1.4,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 20
  },
  cities: {
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    color: 'white',
    width: '100%',
  }
});