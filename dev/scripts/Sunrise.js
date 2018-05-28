import React from 'react';
import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer} from 'react-google-maps';
import{compose, withProps, lifecycle} from 'recompose';
import MapWithADirectionsRenderer from './Map.js';
import moment from 'moment';

class Sunrise extends React.Component {

    constructor(){
        super();
        this.state={
            destination: "",
            finalDestination: "Toronto"
        }
        // final destination initializes the map with a destination of Toronto
        // this will only change once the user enters a destination
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
       
    handleChange(e){
        // ?????? okay
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const destClone = this.state.destination
        this.setState({
            finalDestination: destClone
        })
    }
    getTimeInterval(sunriseTime, runDuration) {
        let end = moment(sunriseTime, "HH:mm");
        end.subtract(runDuration, 'minutes');
        return end.format("H:mm")
    }

    getTimeInterval(sunriseTime, runDuration) {
        let end = moment(sunriseTime, "HH:mm");
        end.subtract(runDuration, 'minutes');
        return end.format("H:mm")
    }

    handleClick(){
        // this is a function of the google-maps-react npm module
        // takes user input and puts it into the function
        this.getLandmark()
    }
    render() {
        console.log(this.state.finalDestination)
        return(
            <div>
                <div className="sunriseSection">
                    <h2 className="sunriseHeader">Sunrise</h2>
                    <p>The sunrise will be at {this.props.sunriseTime}</p>
                    <form action="#" onSubmit={this.handleSubmit}>
                        <input type="text" name="destination" onChange={this.handleChange} value={this.state.destination}placeholder="enter a landmark"/>
                        <input type="submit" name="submit" value="search" />
                    </form>
                    <div id="map"></div>
<<<<<<< HEAD
                    <MapWithADirectionsRenderer getTimeInterval={this.getTimeInterval} lat={this.props.lat} lng={this.props.long} destination={this.state.finalDestination} sunriseTime={this.props.sunriseTime}/>
=======
                    <MapWithADirectionsRenderer lat={this.props.lat} lng={this.props.long} destination={this.state.finalDestination} getTimeInterval={this.getTimeInterval}sunriseTime={this.props.sunriseTime} />
>>>>>>> a946f0593a18aefe8cf668fae2416e42047cc85c
                    <button className="saveLink" >Save Run</button>

                


                </div>
            </div>
        )
    }
}
export default Sunrise;