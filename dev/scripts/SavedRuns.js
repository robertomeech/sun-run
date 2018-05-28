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
            savedRuns: [],
            userImage:''
            // userId: ''
            // userId: this.props.user.id
        }
        this.getDataFromFirebase = this.getDataFromFirebase.bind(this);
        this.removeFirebaseItem = this.removeFirebaseItem.bind(this)
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
                savedRuns: savedRun,
                userImage: this.props.userImage
            })
        });
        // this.setState({
        //     user:this.props.user,
        //     userID:this.props.userID
        // })
    }

    removeFirebaseItem(keyToRemove){
        // firebase.database().ref('users/' + this.props.userId + '/userRuns/'.key).remove()
        console.log('clicked')
        console.log(keyToRemove)


        // const dbRef = firebase.database().ref('users/' + this.props.userId + '/userRuns');
        
        firebase.database().ref('users/' + this.props.userId + `/userRuns/${keyToRemove}`).remove()
            
        
    }
    componentDidMount(){
        this.getDataFromFirebase()
    }


    
    render(){
        return(
            <div className='savedRunsContainer'>
                {this.state.savedRuns.map((run) => {
                    return(
                    <div className='savedRun' key={run.key}>
                        <button onClick={() => this.removeFirebaseItem(run.key)}>
                            <img src="../../images/x.svg" className='x' alt=""/>
                        </button>
                        <h3>Date: {run.run.date}</h3>
                        <h3>Time to leave: {run.run.leaveTime}</h3>
                        <h3>Run Duration: {run.run.runTime}</h3>
                    </div>

                    )
                })}
            </div>
        )
    }


}

export default SavedRuns;
