import React from 'react';

class BoilingVerdict extends React.Component {
    constructor(props){
        super(props);

    }


    
    render() {
        if(this.props.temperature > 100) {
            return(
                <div>
                    <p>The water boils.</p>
                    <p>{this.props.temperature}</p>

                </div>
            );
        }
        else {
            return (
                <div>
                    <p>The water doesn't boil</p>
                    <p>{this.props.temperature}</p>
                </div>
            );
        }
    }
}

export default BoilingVerdict;
