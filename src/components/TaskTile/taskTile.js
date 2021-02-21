import React, { Component } from 'react';
import '../../scss/taskTile.scss';
import '../../scss/style.scss'
class TaskTile extends Component {
    constructor(props){
        super(props);
        this.state = {
            value:props.taskName
        }
    }
    render(){
        console.log("In tasktile",this.props.taskName)
        return(
            <div className="task-tile">
                <p>{this.state.value}</p>
                <span className="remove button" onClick={this.removeTask()}><a href="#" className="icon-cancel-circle"></a></span>
                <span className="move-right button" onClick={this.moveTaskRight()}><a href="#" className="icon-circle-right"></a></span>
                <span className="move-left button" onClick={this.moveTaskLeft()}><a href="#" className="icon-circle-left"></a></span>
            </div>
        )
    }
}
export default TaskTile;