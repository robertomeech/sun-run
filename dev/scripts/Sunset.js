import React from 'react';
import Moment from 'react-moment';
import RNMomentCountDown from 'react-moment-countdown';
import moment from 'moment';
import DatePicker from 'react-date-picker/dist/entry.nostyle';

class Sunset extends React.Component {
    constructor() {
        super();
        this.state = {
            runDuration:'',
            sunsetHour:'',
            sunsetMinute:'',
            time: new Date(),
            currentTime: '',
            chosenDate: '05-27-2018',
            chosenTime: '22:00:00',
            // times: '22:45:00'
            }
    this.runDurationChange = this.runDurationChange.bind(this)
    this.countDownTimer = this.countDownTimer.bind(this)
    }

    runDurationChange(e) {
        this.setState({
            runDuration: e.target.value
        })
    }

    countDownTimer(e) {
        let sunsetHour = this.props.sunsetTime.split(':')[0]
        let sunsetMinute = this.props.sunsetTime.split(':')[1]
        let currentTime = this.state.time.toLocaleTimeString();

        this.setState({
            sunsetHour:sunsetHour,
            sunsetMinute:sunsetMinute,
            currentTime:currentTime
        })
    }

    // getTimeInterval(startTime, endTime) {
    //     let start = moment("20:30:00", "HH:mm:ss");
    //     let end = moment("22:30:00", "HH:mm:ss");
    //     let minutes = end.diff(start, 'minutes');
    //     let interval = moment().hour(0).minute(minutes);
    //     interval.subtract(this.state.runDuration, 'minutes');
    //     return interval.format("HH:mm:ss");
    // }

    getTimeInterval(endTime) {
        let end = moment(this.props.largeSunsetTime, "HH:mm:ss");
        // let minutes = end.diff(start, 'minutes');
        // let interval = moment().hour(0).minute(minutes);
        end.subtract(this.state.runDuration, 'minutes');
        return end.format("HH:mm:ss");
    }

    
    render() {
        
        return (
            <div>
                {/* <RNMomentCountDown toDate={this.props.sunsetDate + this.props.largeSunsetTime} sourceFormatMask='MM-DD-YYYY HH:mm:ss' /> */}
                {this.props.sunsetDate ? <RNMomentCountDown toDate={this.props.sunsetDate + this.props.largeSunsetTime} sourceFormatMask='MM-DD-YYYY HH:mm:ss' /> : null}
                {/* <RNMomentCountDown toDate={'5-25-2018' + this.props.largeSunsetTime} sourceFormatMask='MM-DD-YYYY HH:mm:ss' /> */}
                <h2>{this.state.sunsetHour}</h2>
                <p>The Sunset will be at {this.props.sunsetTime}</p>
                <p>Duration of Run</p>
                <select value={this.state.runDuration} onChange={this.runDurationChange}>
                    <option value=""></option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                </select>
            <p>I want to run for {this.state.runDuration} Minutes</p>
            <p>{this.getTimeInterval()}</p>
            </div>
        )
    }
}
export default Sunset;