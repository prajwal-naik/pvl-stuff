import React from 'react';
import Greetings from './conditionalRender';
import Toggler from './toggleComponent';

class LoginModule extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn: false
        };
        this.handleLogin=this.handleLogin.bind(this);
    }

    handleLogin() {
        this.setState(state=>({
            isLoggedIn: !state.isLoggedIn
        }));
    }

    render() {
        return(
            <div>
                <Greetings isLoggedIn={this.state.isLoggedIn}></Greetings>
                <Toggler handleLogin={this.handleLogin}></Toggler>
                <br></br>
            </div>
        );
    }
}

export default LoginModule; 