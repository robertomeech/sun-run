import React from 'react';
import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer} from 'react-google-maps';
import{compose, withProps, lifecycle} from 'recompose';
import MapWithADirectionsRenderer from './Map.js'



class Sunrise extends React.Component {

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this)
        this.state={
            destination: "",
            finalDestination: "Toronto"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
                        <input type="text" name="destination" onChange={this.handleChange} value={this.state.destination}placeholder="enter a landmark?"/>
                        <input type="submit" name="submit" />
                    </form>
                    <div id="map"></div>
                    <MapWithADirectionsRenderer lat={this.props.lat} lng={this.props.long} destination={this.state.finalDestination}/>
                    <button className="saveLink">Save Run</button>
                </div>
            </div>
        )
    }
}
export default Sunrise;