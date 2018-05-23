import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    render() {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords.latitude, position.coords.longitude);
        });
      return (
        <div>
          Hello
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
