import React from 'react';

import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from 'react-google-maps';
import { compose, withProps, lifecycle, withState } from 'recompose';

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
            // put time wizardry here
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
    console.log(props)
    return (

        <div>
            {props.directions && props.directions.routes[0].legs[0].distance.text}
            {props.directions && props.directions.routes[0].legs[0].duration.text}
            <GoogleMap
                defaultZoom={7}
                defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
            >
                {props.directions && <DirectionsRenderer directions={props.directions} />}
            </GoogleMap>
        </div>
    )
}

);

export default MapWithADirectionsRenderer;