
import React,{  Component } from "react";
import '../../scss/modal.scss'
class Modal extends Component {
    constructor(props){
        super(props)
    }
    render() {
        console.log(this.props.show);
        let modalClass = "modal ";
        modalClass+=this.props.show ? "display-block":"display-none";
        console.log(modalClass)
        return(
            <div className={modalClass}>
                <div className="modal-main">
                    {this.props.children}
                    <a href="#" className="close-button" onClick={this.props.handleClose}>Close</a>
                </div>
            </div>
        )
    }
}
export default Modal