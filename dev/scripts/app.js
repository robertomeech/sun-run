import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import{BrowserRouter as Router, Route, Link, } from 'react-router-dom';
import Sunrise from './Sunrise.js';
import Sunset from './Sunset.js';
import axios from 'axios';
import firebase, {auth, provider} from 'firebase';
import SavedRuns from './SavedRuns.js';
import moment from 'moment';
import Footer from './Footer.js'


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
        correctSunset:'',
        user: '',
        userImage: ''
      }

    this.onChange = this.onChange.bind(this);
    this.success = this.success.bind(this);
    this.getAxios = this.getAxios.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.runDataPush = this.runDataPush.bind(this);
    }

    onChange(dateClicked) {
      
      this.setState({
        date: dateClicked,
      })
      this.getAxios();
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
          date: this.state.date
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
          let newSplit4 = newSplit3.split('0')[1];
          let correctHour = splitSunsetTime - newSplit4  ;

          let sunsetHour = correctHour + 12;
          let correctSunsetHour = sunsetHour + `:` + splitSunsetMinute + `:` + `00`;
          let correctSunsetTime = correctHour + `:` + splitSunsetMinute + `PM`;

          let sunriseTime = res.data.results.sunrise;
          let splitSunriseTime = sunriseTime.split(':')[0];
          let splitSunriseMinute = sunriseTime.split(':')[1];

          let correctSunriseHour = splitSunriseTime - newSplit4;
          let correctSunriseTime = correctSunriseHour + `:` + splitSunriseMinute + `AM`;

          let month = this.state.date.getMonth() + 1;
          let year = this.state.date.getUTCFullYear();
          let day = this.state.date.getDate();

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

    userDataPush(user){
        var database = firebase.database();
        function writeUserData(userId, name, email, imageUrl) {
            firebase.database().ref('users/' + userId).set({
                username: user.displayName,
                email: user.email
            });
        }
    }

    runDataPush(runs) {
      let userId = this.state.user.id
      firebase.database().ref('users/' + userId + '/userRuns/').push({
        run: runs,
        user: userId
      })      
    }

    componentDidMount() {
        
        navigator.geolocation.getCurrentPosition(this.success);
        this.dbRef = firebase.database().ref()
        
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                let dbRefUser = firebase.database().ref('users/' + user.uid);
                //Add value listener to user node in database
                dbRefUser.on('value', (snapshot) => {
                    if (snapshot.exists()) {
                      let loggedInUser = snapshot.val();
                      this.setState({
                          loggedIn: true,
                          user: loggedInUser,
                          userImage: user.photoURL
                      });
                      this.dbRefUser = dbRefUser;
                  } else { //if the user does not already exist in the database- create them
                      const loggedInUser = {
                          id: user.uid,
                          name: user.displayName,
                          photo: user.photoURL,
                      }
                      this.setState({
                          loggedIn: true,
                          user: loggedInUser
                      })
                      dbRefUser.set(loggedInUser);
                  }
              });
          } else { //user is logging out
              this.setState({
                  loggedIn: false,
                  user: null
              });
              //Remove the value event listener
              if (this.dbRefUser) {
                  this.dbRefUser.off();
              }
          }//end of else statement
      })
    }
    
    loginWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        
        firebase.auth().signInWithPopup(provider)
        .then((user) => {
            const id = user.user.uid;
            let userEmail = user.user.email
            this.setState({
                uid: id,
                userImage: user.photoURL
            })
            userDataPush(user)
          
        })
        .catch((error) => {
        });
    }

    logout(){
        firebase.auth().signOut();
        this.dbRef.off('value');
    }

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper">
                    <img className="clouds" src="../../images/clouds.svg" alt="three clouds"/>


                    {/* if user is logged in, signout button is displayed */}
                    {this.state.loggedIn===true ? 
                        <button className="signInOutButton"onClick={this.logout}>Sign Out</button> : null}

                    <h1>Sun Run</h1>
                    <img src="../../images/sun.svg" className="sunImage" alt=""/>


                    {/* displays a blurb about the app before the user signs in */}
                    {this.state.loggedIn === false && 
                        <div>
                            <p className="introP">Sun Run is an app that allows you to schedule your runs so that you are home before sunset or can select a chosen destination to watch the beautiful sunrise. Choose a date to get started!</p>
                            <button className="signInOutButton signInButton"onClick={this.loginWithGoogle}>Login with Google</button>
                        </div>
                    }

                    {/* if user is logged in, main app displays */}
                    {this.state.loggedIn === true && <div>
                        <Router className="section stylings">
                            <div className="transformInline">
                                <Link className='userImage' to='/SavedRuns'> <img className='userIMG' src={this.state.userImage} alt="Google Profile image of the user is shown" /></Link>
                                <Route path='/SavedRuns' render={() => 
                                <SavedRuns userId={this.state.user.id} />} />

                                {/* the sideBar contains the date picker and our two buttons to select run time */}
                                <div className="sideBar">
                                    <div className="datePicker">
                                        <h2>Run Date</h2>
                                        <DatePicker
                                            onChange={this.onChange}
                                            value={this.state.date}
                                            />
                                    </div>
                                    
                                    <Link className="sunriseLink" to='/Sunrise'>  Sunrise</Link>
                                    <p className="or">or</p>
                                    <Link className="sunsetLink" to='/Sunset'>  Sunset</Link>
                                </div>

                                <Route path='/Sunrise' render={() =>
                                <Sunrise sunriseTime={this.state.sunriseTime} lat={this.state.latitude} long={this.state.longitude} date={this.state.userDate}runDataPush={this.runDataPush} />} />

                                <div className="testingbackground">
                                <Route path='/Sunset' render={() =>
                                <Sunset sunsetDate={this.state.userDate} sunsetTime={this.state.sunsetTime} userImage={this.state.userImage} largeSunsetTime={this.state.correctSunset} runDataPush={this.runDataPush}/>
                                }/>
                                </div>

                            </div>
                        </Router>
                    </div>}
                 
                </div> 
            <Footer />
            </div>
        )
    }

}


ReactDOM.render(<App />, document.getElementById('app'));
