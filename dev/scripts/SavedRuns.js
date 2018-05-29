import React from 'react';
import firebase, { auth, provider } from 'firebase';
import { TwitterIcon } from 'react-share';
import { TwitterShareButton } from 'react-share';

class SavedRuns extends React.Component {
    constructor(){
        super();
        this.state = {
            savedRuns: [],
            userImage:''
        }
        this.getDataFromFirebase = this.getDataFromFirebase.bind(this);
        this.removeFirebaseItem = this.removeFirebaseItem.bind(this);
    }

    getDataFromFirebase(){
        //gets all run data from firebase and displays it on the page
        const dbRef = firebase.database().ref('users/' + this.props.userId + '/userRuns/');
        dbRef.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data)

            const savedRun = [];

            for(let run in data) {
                data[run].key = run
                savedRun.push(data[run])
            }

            this.setState({
                savedRuns: savedRun,
                userImage: this.props.userImage
            })
        });
        
    }

    removeFirebaseItem(keyToRemove){
        //takes the key from the mapped item clicked and removes the firebase item corresponding to the key.
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
                            <img src="../../images/x.svg" className='x' alt="A little 'x' icon to delete the saved run."/>
                        </button>
                        <h3>Date: {run.run.date}</h3>
                        <h3>Time to leave: {run.run.leaveTime}</h3>
                        <h3>Run Duration: {run.run.runTime}</h3>
                        <div className='shareRun'>
                            <TwitterIcon  className='twitterIcon' size={30} round={true} className="twitterIcon"/>
                            <p>Share Run</p>
                            <TwitterShareButton className="twitterShare"
                                    size={50} height={100} url={`www.google.ca`}
                            />
                        </div>
                    </div>

                    )
                })}
            </div>
        )
    }


}

export default SavedRuns;
