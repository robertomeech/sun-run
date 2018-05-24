import React from 'react';
import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import{compose, withProps} from 'recompose';


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
                
                
                
                        
            
                        
            </div>
        )
    }
}
export default Sunrise;