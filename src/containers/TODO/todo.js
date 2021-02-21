import React ,{ Component } from "react";
import '../../scss/toDoPage.scss';
import TaskTile from '../../components/TaskTile/taskTile';

class TODO extends Component {
    constructor(props){
        super(props);
        this.state = {
            action:"TODO"
        }
    }
    render() {
        let taskArr = this.props.taskArr;
        let renderTaskArr = taskArr.map((item,index)=>{
            return <TaskTile key={index} 
            taskName={item} 
            moveTaskLeft={()=>this.props.moveLeft(index,this.state.action)}
            moveTaskRight={()=>this.props.moveRight(index,this.state.action)}
            removeTask={()=>this.props.cancel(index,this.state.action)}></TaskTile>
        })
        return(
            <div className="task-container">
                <h2>ToDo</h2>
                {renderTaskArr}
            </div>
        )
    }
}

export default TODO;