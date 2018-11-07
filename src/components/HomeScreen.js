import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Image
} from 'react-native';

let defaultCities = [
  'Atlanta',
  'Marietta',
  'Hoboken',
  'Newark',
  'Chicago',
  'Boston'
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
        <View style={styles.textBoxContainer}>
          <TextInput style={styles.textBox} placeholder={"Enter a city to get the weather"} placeholderTextColor="white" onChangeText={(text) => this.setState({ text })}/>
          <TouchableOpacity style={styles.submitButtonContainer} onPress={this.onSubmitButtonPress}>
              <Text style={{color: 'white', fontSize: 20}}>Submit</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollViewContainer}>
          {this.renderCities()}
        </ScrollView>
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
  textBoxContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').width/5  
  },
  image: {
    height: 10,
    width: 10,
  },
  textBox: {
    height: 40,
    width: Dimensions.get('window').width/1.4,
    color: 'white',
    paddingLeft: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    borderRightWidth: 0,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: Dimensions.get('window').height/16,
  },
  submitButtonContainer: {
    width: '100%',
    height: 40,
    width: Dimensions.get('window').width/5,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
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