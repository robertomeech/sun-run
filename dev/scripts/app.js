import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import axios from 'axios';



class App extends React.Component {
    constructor() {
      super();
      this.state = {
        date: new Date(),
        latitude:'',
        longitude:''
      }

    this.onChange = this.onChange.bind(this)
    this.success = this.success.bind(this)
    this.getAxios = this.getAxios.bind(this)
    // this.axiosCall = this.axiosCall.bind(this)
    }

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
          date: this.state.date
        }
      })
        .then((res) => {
          console.log(res.data)
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
      console.log('hello???');
      // this.getAxios()
    }

    render() {
        
      return (
        <div>
          {/* <button onClick={this.handleClick}>Show my location</button> */}

          <div id="out">Testing</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <DatePicker
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
      )
    }
}





ReactDOM.render(<App />, document.getElementById('app'));
