import React from 'react';
import firebase, { auth, provider } from 'firebase';

// const config = {
//     apiKey: "AIzaSyCHcaafweVL2ZQVgM4zN1kFjEuIykBw7yQ",
//     authDomain: "sunrisesunset-1527022043864.firebaseapp.com",
//     databaseURL: "https://sunrisesunset-1527022043864.firebaseio.com",
//     projectId: "sunrisesunset-1527022043864",
//     storageBucket: "sunrisesunset-1527022043864.appspot.com",
//     messagingSenderId: "59111531936"
// };
// firebase.initializeApp(config);

class SavedRuns extends React.Component {
    constructor(){
        super();
        this.state = {
            // userId: this.props.userId
            savedRuns: []
            // userId: ''
            // userId: this.props.user.id
        }
        this.getDataFromFirebase = this.getDataFromFirebase.bind(this);
    }

    getDataFromFirebase(){
        const dbRef = firebase.database().ref('users/' + this.props.userId + '/userRuns/');
        dbRef.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data)

            const savedRun = [];

            for (let run in data) {
                data[run].key = run
                savedRun.push(data[run])
            }

            this.setState({
                savedRuns: savedRun
            })
        });
        // this.setState({
        //     user:this.props.user,
        //     userID:this.props.userID
        // })
    }

    componentDidMount(){
        this.getDataFromFirebase()
    }

    
    render(){
        return(
            <div>
                <h1>Hello World</h1>
            </div>
        )
    }


}

export default SavedRuns;
