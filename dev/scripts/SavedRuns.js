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
            user:{},
            userID: ''
            // userID: this.props.user.ID
        }
        this.getDataFromFirebase = this.getDataFromFirebase.bind(this);
    }

    getDataFromFirebase(){
        // const dbRef = firebase.database().ref(users.userID)
        // console.log(this.props.user)
        this.setState({
            user:this.props.user,
            userID:this.props.userID
        })
        console.log(this.state.user)
        


    }

    componentDidMount(){
        this.getDataFromFirebase()
    }

    
    render(){
        return(
            <div><h1>HELLO WORLD</h1></div>
        )
    }


}

export default SavedRuns;
