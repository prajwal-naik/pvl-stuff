import React from 'react';

function UserGreetings() {
    return(
        <h1>Hey user! You're logged in</h1>
    );
}

function GuestGreetings() {
    return(
        <h1>Hey Guest! You need to log in</h1>
    );
}

class Greetings extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    render() {
        if(this.props.isLoggedIn) {
            return(
                <div>
                    <UserGreetings></UserGreetings>
                </div>
            );
        }
        else {
            return(
                <div>
                    <GuestGreetings></GuestGreetings>
                </div>
            );
        }
    }

}

export default Greetings;