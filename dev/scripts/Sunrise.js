import React from 'react';

class Sunrise extends React.Component {
    render(){
        return(
            <div>
                <p>The sunrise will be at {this.props.sunriseTime}</p>
                <form action="#">
                    <input type="text" placeholder="enter a landmark?"/>
                </form>
                <div id="map"></div>

                
                        
            
                        
            </div>
        )
    }
}
export default Sunrise;