import React from 'react';

import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer} from 'react-google-maps';
import{compose, withProps, lifecycle} from 'recompose';

const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(41.8507300, -87.6512600),
                destination: new google.maps.LatLng(41.8525800, -87.6514100),
                travelMode: google.maps.TravelMode.WALKING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                    console.log(result)
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
    >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
);


// const MyMapComponent = compose(
//     withProps({
//         googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDXgVNpWjqGce14Uv4RKfgk4cVaSSSC7Hg&v=3.exp&libraries=geometry,drawing,places",
//         loadingElement: <div style={{ height: `100%` }} />,
//         containerElement: <div style={{ height: `400px` }} />,
//         mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap
// )((props) =>
//     <GoogleMap
//         defaultZoom={1}
//         defaultCenter={{ lat: -34.397, lng: 150.644 }}
//     >
//         {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//     </GoogleMap>
// )


    

class Sunrise extends React.Component {

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this)
        // this.getLandmark = this.getLandmark.bind(this)
    }

   
       
    


    handleClick(){
        this.getLandmark()
    }
    render() {
       

        

        return(
            <div>
                <p>The sunrise will be at {this.props.sunriseTime}</p>
                <form action="#">
                    <input type="text" placeholder="enter a landmark?"/>
                </form>
                <div id="map"></div>
                <button onClick={this.handleClick}>content</button>
                <MapWithADirectionsRenderer />
                
                
                        
            
                        
                {/* <MyMapComponent isMarkerShown /> */}
            </div>
        )
    }
}
export default Sunrise;