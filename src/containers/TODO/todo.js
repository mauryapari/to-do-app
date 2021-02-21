import React ,{ Component } from "react";
import '../../scss/toDoPage.scss';
import TaskTile from '../../components/TaskTile/taskTile';

class TODO extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let taskArr = this.props.taskArr;
        let renderTaskArr = taskArr.map((item,index)=>{
            return <TaskTile key={index} taskName={item}></TaskTile>
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