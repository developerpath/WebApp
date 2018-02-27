import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
} from 'react-native';
const styles = require('./styles.js');

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      host: 'http://api.openweathermap.org/data/2.5/weather?',
      api: '&appid=05a96ed3c1996fb4ad230d4446917bbd',
      initLoad: false,
      input: false,
      inputCity: '',
      loadScreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left:0,
        right: 0,
        backgroundColor: '#fff',
        zIndex: 10,
        opacity: 1,
        fontSize: 60,
        paddingTop: 250,
        textAlign: 'center',
        color: '#28005f',
      },
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let location = 'lat='+position.coords.latitude+'&lon='+position.coords.longitude;
        this.setState({
          query: location,
          initLoad: true,
          loadScreen: {
            opacity: 0,
            zIndex: -1,
          }
        });
      },
      (error) => {
        alert(error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    );
  }
    
  getData(){
    let checker = setInterval(() => {
      if (this.state.initLoad == true) {
        return fetch(this.state.host + this.state.query + this.state.api)
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.name){
              let sr = new Date(responseJson.sys.sunrise*1000).toLocaleTimeString();
              let ss = new Date(responseJson.sys.sunset*1000).toLocaleTimeString();
              let is = "https://raw.githubusercontent.com/developerpath/weatherApp/master/WeatherAPP/" +
                  responseJson.weather[0].icon +".png";
              let t = Math.round(responseJson.main.temp)-273;
              this.setState({
                msg: responseJson.weather[0].description.toUpperCase(),
                wind: responseJson.wind.speed,
                pressure: responseJson.main.pressure,
                humid: responseJson.main.humidity,
                sunrise: sr,
                sunset: ss,
                image: is,
                temp: t,
                city: responseJson.name,
                country: responseJson.sys.country,
              });
              clearInterval(checker);
            } else {
              alert ("City like this does not exist.\nTry again.")
              clearInterval(checker);
            }
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }, 500);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    let date = new Date().toLocaleDateString();
    return (
      <View style={styles.container}>
        <Text style={styles.header} >WeatherApp by</Text>
        <Text style={styles.header} >Alex Chernyshev</Text>

        <View style={{ flex:0.15, marginTop: 10, marginLeft: 20, marginRight: 20}} >
          <Text style={styles.city} >{this.state.city}, {this.state.country}</Text>
          <Text style={styles.date} >{date}</Text>
        </View>
        
        <View style={{ flex:0.45, flexDirection: 'row'}} >
          <View style={{ flex: 0.42}} >
            <Text style={styles.temp}>{this.state.temp}&deg;</Text>
          </View>
          <View style={{ flex: 0.58, flexDirection: 'row', paddingRight: 20}} >
            <Image style={{ flex: 1, height: 230 }} source={{uri: this.state.image}} />
          </View>
        </View>
      
        <View style={styles.msg} >
          <Text style={styles.msgText} >-- { this.state.msg } --</Text>
          <Text style={styles.msgText} >Wind: { this.state.wind } m/s</Text>
          <Text style={styles.msgText} >Pressure: { this.state.pressure } hPa</Text>
          <Text style={styles.msgText} >Humidity: { this.state.humid } %</Text>
          <Text style={styles.msgText} >Sunrise: { this.state.sunrise }</Text>
          <Text style={styles.msgText} >Sunset: { this.state.sunset }</Text>
        </View>
        
          <TextInput
            style={styles.input}
            onChangeText={(inputCity) => this.setState({inputCity})}
            onSubmitEditing={this.getCity.bind(this)}
            placeholder='Enter City...'
            value={this.state.inputCity}
          />
        <Text style={this.state.loadScreen} >Loading...</Text>
      </View>
      
    );
  }
  getCity(){
    if (this.state.inputCity !== ''){
      let tq = 'q='+this.state.inputCity;
      this.setState({
        query: tq,
        input: true,
      });
      let checker = setInterval(() => {
        if (this.state.input == true){
          this.getData();
          clearInterval(checker);
          this.setState({
            input: false,
          });
        }
      }, 1000);
    }
  }

}

//&#8457; &#8451;
