import React, { Component } from 'react';
import '../../scss/spinner.scss';

class Spinner extends Component {
    render(){
        return(
            <div className="modal">
                <div className="loader"></div>
            </div>
        )
    }
}

export default Spinner;