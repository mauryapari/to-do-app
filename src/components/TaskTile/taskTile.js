import React, { Component } from 'react';
import '../../scss/taskTile.scss';
import '../../scss/style.scss'
class TaskTile extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="task-tile">
                <p>{this.props.taskName}</p>
                <span className="remove button" onClick={this.props.removeTask}><a href="#" className="icon-cancel-circle"></a></span>
                <span className="move-right button" onClick={this.props.moveTaskRight}><a href="#" className="icon-circle-right"></a></span>
                <span className="move-left button" onClick={this.props.moveTaskLeft}><a href="#" className="icon-circle-left"></a></span>
            </div>
        )
    }
}
export default TaskTile;