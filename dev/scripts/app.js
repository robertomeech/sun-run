import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import{BrowserRouter as Router, Route, Link, } from 'react-router-dom';
import Sunrise from './Sunrise.js';
import Sunset from './Sunset.js'
import axios from 'axios';
import moment from 'moment'



class App extends React.Component {
    constructor() {
      super();
      this.state = {
        date: new Date(),
        latitude:'',
        longitude:'',
        sunsetTime:'',
        sunriseTime:'',
        userDate: '',
        month: '',
        day: '',
        year:'',
        correctSunset:''
      }

    this.onChange = this.onChange.bind(this);
    this.success = this.success.bind(this);
    this.getAxios = this.getAxios.bind(this);
    this.onChange = this.onChange.bind(this);
    }


    // onChange = date => this.setState({ date })

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
      // console.log(latitude)
      let longitude = position.coords.longitude;
      // console.log(longitude)
      this.setState({
        latitude: latitude,
        longitude: longitude
      })

      this.getAxios();
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(this.success);
      // this.getAxios()
    }
  
    render() {

      
        
      return (
        <div>
          {/* <button onClick={this.handleClick}>Show my location</button> */}

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
              <Route path='/Sunrise' render={()=> 
                <Sunrise sunriseTime={this.state.sunriseTime} lat={this.state.latitude} long={this.state.longitude}/>
              }/>

              <Link to='/Sunset'>Sunset</Link>
              <Route path='/Sunset' render={() =>
                <Sunset sunsetDate={this.state.userDate} sunsetTime={this.state.sunsetTime}largeSunsetTime={this.state.correctSunset}/>
              } />
            </div>
        </Router>
       
          
      
        </div>
      )
    }
}






ReactDOM.render(<App />, document.getElementById('app'));
