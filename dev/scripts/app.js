import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import{BrowserRouter as Router, Route, Link, } from 'react-router-dom';
import Sunrise from './Sunrise.js';
import Sunset from './Sunset.js'
import axios from 'axios';
import firebase from 'firebase';
import moment from 'moment'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCHcaafweVL2ZQVgM4zN1kFjEuIykBw7yQ",
  authDomain: "sunrisesunset-1527022043864.firebaseapp.com",
  databaseURL: "https://sunrisesunset-1527022043864.firebaseio.com",
  projectId: "sunrisesunset-1527022043864",
  storageBucket: "sunrisesunset-1527022043864.appspot.com",
  messagingSenderId: "59111531936"
};
firebase.initializeApp(config);



class App extends React.Component {
    constructor() {
      super();
      this.state = {
        date: new Date(),
        latitude:'',
        longitude:'',
        sunsetTime:'',
        sunriseTime:'',
        loggedIn: false,
        userDate:'',
        month: '',
        day: '',
        year:''
      }

    this.onChange = this.onChange.bind(this);
    this.success = this.success.bind(this);
    this.getAxios = this.getAxios.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    }

    onChange(dateClicked) {
      
      this.setState({
        date: dateClicked,
      })

      this.getAxios()
      let month = dateClicked.getMonth() + 1
      let year = dateClicked.getUTCFullYear();
      let day = dateClicked.getDate();
      // console.log(day);

      this.setState({
        month:month,
        day:day,
        year:year,
        userDate: month + '-' + day + '-' + year
      })   
    }

    handleChange(e, field) {
      const newState = Object.assign({}, this.state);
      newState[field] = e.target.value;
      this.setState(newState);
    }

    getAxios(){
      axios.get('https://api.sunrise-sunset.org/json', {
        params: {
          lat: this.state.latitude,
          lng: this.state.longitude,
          date: this.state.date,
        }
      })
      .then((res) => {
        // correcting the sunrise/sunset times so that they are no longer in UTC
        let sunsetTime = res.data.results.sunset
        // console.log(sunsetTime)
        let splitSunsetTime = sunsetTime.split(':')[0]
        // console.log(splitSunsetTime)
        let splitSunsetMinute = sunsetTime.split(':')[1]
        // console.log(splitSunsetMinute);
        // isolating user date
        let userDate = Date();
        let splitDate =  userDate.split(' ');
        // console.log(splitDate)
        let timeOne = splitDate.splice(5,1)
        // console.log(timeOne)
      // console.log(typeof(timeOne))
        let newSplit2 = timeOne[0].split('-');
        // console.log(newSplit2);
        let newSplit3 = newSplit2.pop();
        // console.log(newSplit3)
        let newSplit4 = newSplit3.split('0')[1]
      //   console.log(newSplit4)
        let correctHour = splitSunsetTime - newSplit4  
        let correctSunsetTime = correctHour + `:` + splitSunsetMinute + `PM`
        let sunriseTime = res.data.results.sunrise
        let splitSunriseTime = sunriseTime.split(':')[0]
        let splitSunriseMinute = sunriseTime.split(':')[1]
        let correctSunriseHour = splitSunriseTime - newSplit4
        let correctSunriseTime = correctSunriseHour + `:` + splitSunriseMinute + `AM`

        this.setState({
          sunsetTime: correctSunsetTime,
          sunriseTime: correctSunriseTime
        })
      })
    }

    success(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      this.setState({
        latitude: latitude,
        longitude: longitude
      })
      this.getAxios();
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(this.success);

      this.dbRef = firebase.database().ref('runs')

      firebase.auth().onAuthStateChanged((user) => {
          if(user != null ){
              this.dbRef.on('value',(snapshot) => {
                  console.log(snapshot.val())
              });
              this.setState({
                  loggedIn: true
              })
          }
          else{
              console.log('user signed out');
              this.setState({
                  loggedIn: false
              })
          }
      })
    }
    
    loginWithGoogle(){
        console.log('clicked button');
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then((user) => {
            console.log(user)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    logout(){
        firebase.auth().signOut();
        this.dbRef.off('value');
        console.log('signed out')
    }

    render() {
      return (
        <div>
            <div>
                {this.state.loggedIn===false && <button onClick={this.loginWithGoogle}>Login with Google</button>}
                {this.state.loggedIn===true ? <button onClick={this.logout}>Sign Out</button> : null}
  
                {this.state.loggedIn === true && <div>
                    <div id="out">Testing</div>
                    <div></div>
                    <div></div>
                    <div>.</div>
                    <div>.</div>
                    <div>.</div>
                    <DatePicker
                      onChange={this.onChange}
                      value={this.state.date}
                    />
                    <Router>
                      <div>

                        <Link to='/Sunrise'>Sunrise</Link>
                        <Route path='/Sunrise' render={() =>
                            <Sunrise sunriseTime={this.state.sunriseTime} lat={this.state.latitude} long={this.state.longitude} />
                        } />

                        <Link to='/Sunset'>Sunset</Link>
                        <Route path='/Sunset' render={() =>
                            <Sunset sunsetDate={this.state.userDate} sunsetTime={this.state.sunsetTime}/>
                        } />
                      </div>
                    </Router>
                </div>}
            </div>     
        </div>
      )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
