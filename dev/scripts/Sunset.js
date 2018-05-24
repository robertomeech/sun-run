import React from 'react';

class Sunset extends React.Component {
    constructor() {
        super();
        this.state = {
            runDuration:''
        }
    this.runDurationChange = this.runDurationChange.bind(this)
    }

    runDurationChange(e) {
        this.setState({
            runDuration: e.target.value
        })
    }

    leaveBy() {
        let sunset = this.props.sunsetTime.split(':')
    }

    

    render() {
        return (
            <div>
                <p>The Sunset will be at {this.props.sunsetTime}</p>

                <p>Duration of Run</p>
                <select value={this.state.runDuration} onChange={this.runDurationChange}>
                    <option value=""></option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="1">60</option>
                </select>
            <p>I want to run for {this.state.runDuration} Minutes</p>
            </div>
        )
    }
}
export default Sunset;