import React from 'react';
import ReactDOM from 'react-dom';
// const DatePicker = require('react-date-picker');
import DatePicker from 'react-date-picker/dist/entry.nostyle';



class App extends React.Component {
    constructor() {
      super();
      this.state = {
        date: new Date()
      }
    }

    // onChange = date => this.setState({ date })

    onChange(date) {
      this.setState({
        date: Date(date)
      })
    }

    componentDidMount() {
       function success(position) {
        let latitude = position.coords.latitude;
        console.log(latitude)
        let longitude = position.coords.longitude;
        console.log(longitude)



        
      }

      navigator.geolocation.getCurrentPosition(success);
    }

     
    render() {
        
      return (
        <div>
          {/* <button onClick={this.handleClick}>Show my location</button> */}
          <div id="out">Testing</div>
          <DatePicker
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
      )
    }
}





ReactDOM.render(<App />, document.getElementById('app'));
