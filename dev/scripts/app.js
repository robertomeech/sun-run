import React from 'react';
import ReactDOM from 'react-dom';
// const DatePicker = require('react-date-picker');
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import{BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Sunrise from './Sunrise.js';



class App extends React.Component {
    constructor() {
      super();
      this.state = {
        date: new Date()
      }
      this.onChange = this.onChange.bind(this);
    }


    // onChange = date => this.setState({ date })

    onChange(dateClicked) {
      this.setState({
        date: dateClicked
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
    handleSunrise(){
        console.log("click")
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
        <Router>
            <div>
                <Link to='/Sunrise'>Sunrise</Link>
                <Route path='/Sunrise' component={Sunrise} />
            </div>
        </Router>

        </div>
      )
    }
}





ReactDOM.render(<App />, document.getElementById('app'));
