import React from 'react';
import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from 'react-google-maps';
import { compose, withProps, lifecycle, withState } from 'recompose';
import moment from 'moment';

const MapWithADirectionsRenderer = compose(

    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('directions', 'setDirections', null),
    lifecycle({

        componentWillReceiveProps(nextProps) {
            if (this.props.destination !== nextProps.destination) {
                const DirectionsService = new google.maps.DirectionsService();
                DirectionsService.route({
                    origin: new google.maps.LatLng(this.props.lat, this.props.lng),
                    destination: nextProps.destination,
                    travelMode: google.maps.TravelMode.WALKING,
                }, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.props.setDirections(result)
                    } else {
                        console.error(`error fetching directions`, result);
                    }
                });
            }
        },
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(this.props.lat, this.props.lng),
                destination: this.props.destination,
                travelMode: google.maps.TravelMode.WALKING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.props.setDirections(result)
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props => {
    let durationOne
    let durationTwo
    let durationThree

    if(props.directions !== null){
    console.log(props.directions && props.directions.routes[0].legs[0].duration.text)
     durationOne = props.directions && props.directions.routes[0].legs[0].duration.text
     durationTwo = durationOne.split(" mins")
        console.log(durationTwo)
     durationThree = durationTwo[0]
    console.log(durationThree)
    }

    return (

        <div className="mapBottom">
            <ul>
                <li>Run Distance: {props.directions && props.directions.routes[0].legs[0].distance.text}</li>
                <li>Run Duration: {props.directions && props.directions.routes[0].legs[0].duration.text}</li>
                <li>Leave By: {props.getTimeInterval(props.sunriseTime, durationThree)}</li>
            </ul>
            
            <GoogleMap
                defaultZoom={7}
                defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
                >
                {props.directions && <DirectionsRenderer directions={props.directions} />}
            </GoogleMap>  
            <button className="saveLink" onClick={() => { props.runDataPush(props.runData(props.getTimeInterval(props.sunriseTime, durationThree), props.directions && props.directions.routes[0].legs[0].duration.text, props.date)) }}>Save Run</button>         
        </div>
    )
}
);

export default MapWithADirectionsRenderer;