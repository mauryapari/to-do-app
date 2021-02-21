import React, { Component } from 'react';
import TODO from '../TODO/todo';
import INPROGRESS from '../InProgressTask/inProgress';
import DONE  from '../DoneTask/done';
import Modal from '../../components/modals/modal'
import '../../scss/main.scss';
import '../../scss/toDoPage.scss';

class TODOPAGE extends Component{
    state = {
        isModalVisible:false,
        toDoTaskArray:[],
        inProgresTaskArr:[],
        doneTaskArr:[],
        newTask:''
    }
    openModal = (e) => {
        e.preventDefault();
        this.setState({
            isModalVisible:true
        })
    }
    hideModal = (e) =>{
        e.preventDefault();
        this.setState({
            isModalVisible:false
        })
    }
    createNewTask = (e) => {
        this.setState({
            newTask:e.target.value
        })
        console.log(this.state.newTask)
    }
    saveTask = (e) => {
        if(e.key=='Enter' || e.keyCode == 13){
            let newTaskArr=[...this.state.toDoTaskArray];
            newTaskArr.push(this.state.newTask);
            this.setState({
                toDoTaskArray:newTaskArr,
                isModalVisible:false,
                newTask:''
            })
        }
    }
    render(){
        const hideTaskContainers = this.state.isModalVisible ? "hide-container" :"show-container";

        return(
            <div>
                <Modal show ={this.state.isModalVisible} handleClose={(e)=>this.hideModal(e)}>
                    <h2>Enter New Task</h2>
                    <input type="text" value={this.state.newTask} onChange={(e)=>this.createNewTask(e)} onKeyDown={(e)=>this.saveTask(e)}/>
                </Modal>
                <div className="upper-half">
                    <a href="#" onClick={(e)=>this.openModal(e)} className="task-button">NEW TASK</a>
                </div>
                <div className="lower-half">
                    <div className={hideTaskContainers + " task-containers"}>
                        <TODO taskArr={this.state.toDoTaskArray}></TODO>
                        <INPROGRESS></INPROGRESS>
                        <DONE></DONE>
                    </div>
                </div>
            </div>
        )
    }
}
export default TODOPAGE;