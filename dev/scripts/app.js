import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import{BrowserRouter as Router, Route, Link, } from 'react-router-dom';
import Sunrise from './Sunrise.js';
import Sunset from './Sunset.js'
import axios from 'axios';



class App extends React.Component {
    constructor() {
      super();
      this.state = {
        date: new Date(),
        latitude:'',
        longitude:'',
        sunsetTime:'',
        sunriseTime:''
      }

    this.onChange = this.onChange.bind(this);
    this.success = this.success.bind(this);
    this.getAxios = this.getAxios.bind(this);
    this.onChange = this.onChange.bind(this);
    }


    // onChange = date => this.setState({ date })

    onChange(dateClicked) {
      this.setState({
        date: dateClicked
      })


      this.getAxios()
      // navigator.geolocation.getCurrentPosition(this.success);
      
    }

    getAxios(){
      axios.get('https://api.sunrise-sunset.org/json', {
        params: {
          lat: this.state.latitude,
          lng: this.state.longitude,
          date: this.state.date,
        //   latAndLng: {this.state.lat},
        }
      })
        .then((res) => {
          // correcting the sunrise/sunset times so that they are no longer in UTC

          let sunsetTime = res.data.results.sunset
          console.log(sunsetTime)
          let splitSunsetTime = sunsetTime.split(':')[0]
          console.log(splitSunsetTime)
          let splitSunsetMinute = sunsetTime.split(':')[1]
          console.log(splitSunsetMinute);
          
          let userDate = Date();
          let splitDate =  userDate.split(' ');
          console.log(splitDate)
          let timeOne = splitDate.splice(5,1)
          console.log(timeOne)
        console.log(typeof(timeOne))
          let newSplit2 = timeOne[0].split('-');
          console.log(newSplit2);
          
          let newSplit3 = newSplit2.pop();
          console.log(newSplit3)
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
      console.log(latitude)
      let longitude = position.coords.longitude;
      console.log(longitude)
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
                <Sunset sunsetTime={this.state.sunsetTime}/>
              } />
            </div>
        </Router>
       
          
      
        </div>
      )
    }
}






ReactDOM.render(<App />, document.getElementById('app'));
