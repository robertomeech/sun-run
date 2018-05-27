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
        year:'',
        correctSunset:''
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
          let splitSunsetTime = sunsetTime.split(':')[0]
          let splitSunsetMinute = sunsetTime.split(':')[1]
          
          // isolating user date
          let userDate = Date();
  
          let splitDate =  userDate.split(' ');
          let timeOne = splitDate.splice(5,1)
          let newSplit2 = timeOne[0].split('-');
          let newSplit3 = newSplit2.pop();
          let newSplit4 = newSplit3.split('0')[1]
          let correctHour = splitSunsetTime - newSplit4  

          let sunsetHour = correctHour + 12
          console.log(sunsetHour)

          let correctSunsetHour = sunsetHour + `:` + splitSunsetMinute + `:` + `00`
          console.log(correctSunsetHour)

          let correctSunsetTime = correctHour + `:` + splitSunsetMinute + `PM`

          let sunriseTime = res.data.results.sunrise
          let splitSunriseTime = sunriseTime.split(':')[0]
          let splitSunriseMinute = sunriseTime.split(':')[1]

          let correctSunriseHour = splitSunriseTime - newSplit4

          let correctSunriseTime = correctSunriseHour + `:` + splitSunriseMinute + `AM`

          let month = this.state.date.getMonth() + 1
          let year = this.state.date.getUTCFullYear();
          let day = this.state.date.getDate();

          console.log(month + '-' + day + '-' + year)
          this.setState({
            sunsetTime: correctSunsetTime,
            sunriseTime: correctSunriseTime,
            correctSunset: correctSunsetHour,
            month: month,
            day: day,
            year: year,
            userDate: month + '-' + day + '-' + year
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
      // need to put user info in template litereals ${ }/
      this.dbRef = firebase.database().ref('runs')
      console.log(this.dbRef)
   

      firebase.auth().onAuthStateChanged((user) => {
          if(user != null ){
              this.dbRef.on('value',(snapshot) => {
                  // console.log(snapshot.val())
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
        // console.log('clicked button');
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then((user) => {
            // console.log(user.user.email)
            let userEmail = user.user.email
            console.log(userEmail)

        })
        .catch((error) => {
            // console.log(error)
        });
    }

    logout(){
        firebase.auth().signOut();
        this.dbRef.off('value');
        // console.log('signed out')
    }

    render() {
      return (
        <div>
            <div className="wrapper">
                {this.state.loggedIn===true ? <button className="signInOutButton"onClick={this.logout}>Sign Out</button> : null}
                <h1>Sun Run</h1>
                {this.state.loggedIn === false && 
                    <div>
                        <p className="introP">Sun Run is an app that allows you to schedule your runs so that you are home before sunset or can make it to a chosen destination to watch the sunrise. Choose a date to get started!</p>
                        <button className="signInOutButton signInButton"onClick={this.loginWithGoogle}>Login with Google</button>
                    </div>
                }

                {this.state.loggedIn === true && <div>
                    <div className="datePicker">
                        <h2>Run Date</h2>
                        <DatePicker
                        onChange={this.onChange}
                        value={this.state.date}
                        />
                    </div>
                    <Router className="section stylings">
                        <div className="transformInline">
                            <Link className="sunriseLink" to='/Sunrise'> <img src="../../images/sunrise.svg" alt=""/> Sunrise</Link>
                            <p>or</p>
                            <Link className="sunsetLink" to='/Sunset'> <img src="../../images/sunset.svg" alt=""/> Sunset</Link>
                            <Route path='/Sunrise' render={() =>
                            <Sunrise sunriseTime={this.state.sunriseTime} lat={this.state.latitude} long={this.state.longitude} />} />
                            <div className="testingbackground">
                                <Route path='/Sunset' render={() =>
                                <Sunset sunsetDate={this.state.userDate} sunsetTime={this.state.sunsetTime} largeSunsetTime={this.state.correctSunset} />
                                } />
                            </div>
                        </div>
                    </Router>
                </div>}
            </div>     
        </div>
      )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
