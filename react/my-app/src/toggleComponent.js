import React from 'react';
import Greetings from './conditionalRender'

class Toggler extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isToggleOn:true
        };
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(){
        this.setState(state=>({
            isToggleOn: !state.isToggleOn
        }));
        this.props.handleLogin();
    }

    render() {
        return (
            <div>
            <button onClick={this.handleClick}>
                {this.state.isToggleOn?'Log In' : 'Log Out'}
            </button>
            </div>
        );
    }
}

export default Toggler;