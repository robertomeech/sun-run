import React from 'react';
import Moment from 'react-moment';
import RNMomentCountDown from 'react-moment-countdown';
import moment from 'moment';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom';
import SavedRuns from './SavedRuns'

class Sunset extends React.Component {
    constructor() {
        super();
        this.state = {
            runDuration:'',
            // sunsetHour:'',
            // sunsetMinute:'',
            time: new Date(),
            // currentTime: '',
            // chosenDate: '05-27-2018',
            // chosenTime: '22:00:00',
            }
    this.runDurationChange = this.runDurationChange.bind(this)
    // this.countDownTimer = this.countDownTimer.bind(this)
    }

    runDurationChange(e) {
        this.setState({
            runDuration: e.target.value
        })
    }

    getTimeInterval() {
        let end = moment(this.props.sunsetTime, "HH:mm:ss");
        end.subtract(this.state.runDuration, 'minutes');
        return end.format("H:mm")
    }

    runData() {
        let runData = {
            leaveTime: this.getTimeInterval(),
            runTime: this.state.runDuration,
            date: this.props.sunsetDate
        }
        return runData;
    }

    
    render() {
        
        return (
            <div>
                <div className="sunsetSection">
                    <h2 className="sunsetHeader">Sunset</h2>
                    <p>The Sunset will be at {this.props.sunsetTime}</p>
                    <h2>Run Duration</h2>
                    <div className="transformInline">
                        <p>I want to run for</p>
                        <select value={this.state.runDuration} onChange={this.runDurationChange}>
                            <option value=""></option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                        </select>
                        <p>Minutes</p>
                    </div>
                    <p>You need to leave by {this.getTimeInterval()}PM</p>
                    <h3>Countdown to tonights sunset</h3>
                    <h4>
                        {this.props.sunsetDate ? <RNMomentCountDown className="countdown" toDate={this.props.sunsetDate + this.props.largeSunsetTime} sourceFormatMask='MM-DD-YYYY HH:mm:ss' /> : null}
                    </h4>
                    <button className="saveLink" onClick={() => {this.props.runDataPush(this.runData())}}>Save Run</button>
                </div>
                <Router>
                    <div>
                    <Link className='userImage' to='/SavedRuns'>
                        <img className='userIMG' src={this.state.userImage} alt="user image" />
                    </Link>
                    <Route path='/SavedRuns'/>
                    </div>
                </Router>
            </div>
        )
    }
}



export default Sunset;