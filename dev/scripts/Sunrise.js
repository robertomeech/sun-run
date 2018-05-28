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
            finalDestination: "Toronto",
            date: ''
        }
        // final destination initializes the map with a destination of Toronto
        // this will only change once the user enters a destination
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        this.setState({
            date:this.props.date
        })
    }
       
    handleChange(e){
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
    runData(x,y,z) {
        let runData = {
            // leaveTime: props.getTimeInterval(props.sunriseTime, durationThree),
            leaveTime: x,
            // runTime: props.directions && props.directions.routes[0].legs[0].duration.text,
            runTime: y,
            date: z

        }
        return runData;
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
                    <MapWithADirectionsRenderer lat={this.props.lat} lng={this.props.long} destination={this.state.finalDestination} getTimeInterval={this.getTimeInterval} date={this.state.date} sunriseTime={this.props.sunriseTime} runDataPush={this.props.runDataPush} runData={this.runData}/>
                </div>
            </div>
        )
    }
}
export default Sunrise;