import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor() {
      super();
      this.state = {
        latitude: '',
        longitude: ''
      }
      this.handleClick = this.handleClick.bind(this)
    }


    handleClick(e) {
      e.preventDefault();

      function success(position) {
        let latitude = position.coords.latitude;
        console.log(latitude)
        let longitude = position.coords.longitude;
        console.log(longitude)
      }

      navigator.geolocation.getCurrentPosition(success);

      }
     
    render() {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords.latitude, position.coords.longitude);
        });
      return (
        <div>
          <button onClick={this.handleClick}>Show my location</button>
          <div id="out"></div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
