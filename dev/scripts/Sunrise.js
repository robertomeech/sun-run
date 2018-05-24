import React from 'react';
<<<<<<< HEAD
import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import{compose, withProps} from 'recompose';

=======
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { compose, withProps } from "recompose";






const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDXgVNpWjqGce14Uv4RKfgk4cVaSSSC7Hg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
)


    
>>>>>>> f6958ed8bf5f9d72a7857d18390bc30984246c05

class Sunrise extends React.Component {

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this)
        this.getLandmark = this.getLandmark.bind(this)
    }

   
       
    


    handleClick(){
        this.getLandmark()
    }
    render() {
       

        

        return(
            <div>
                <form action="#">
                    <input type="text" placeholder="enter a landmark?"/>
                </form>
                <div id="map"></div>
                <button onClick={this.handleClick}>content</button>
                
                
                
                        
            
                        
                <MyMapComponent isMarkerShown />
            </div>
        )
    }
}
export default Sunrise;