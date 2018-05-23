import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
      super();
    }


    handleClick(e) {
      e.preventDefault();
      function success(position) {
        var latitude = position.coords.latitude;
        console.log(latitude);
        var longitude = position.coords.longitude;
        console.log(longitude);
      }

      navigator.geolocation.getCurrentPosition(success);
    }

   
        
      
        
    


    render() {
      return (
        <div>
          <button onClick={this.handleClick}>Show my location</button>
          <div id="out"></div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
