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
        newTask:'',
        isErrorModalVisible : false
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
            isModalVisible:false,
            isErrorModalVisible:false
        })
    }

    createNewTask = (e) => {
        this.setState({
            newTask:e.target.value
        })
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

    removeTask=(index,type)=>{
        var newArr = []
        if(type ==="TODO"){
            newArr = [...this.state.toDoTaskArray];
            newArr.splice(index,1);
            this.setState({
                toDoTaskArray : newArr
            })
        } else if(type === "INPROGRESS"){
            newArr = [...this.state.inProgresTaskArr];
            newArr.splice(index,1);
            this.setState({
                inProgresTaskArr : newArr
            })
        } else if(type === "DONE"){
            newArr = [...this.state.doneTaskArr];
            newArr.splice(index,1);
            this.setState({
                doneTaskArr : newArr
            })
        }
    }

    moveRight = (index,type) => {
        console.log(index);
        var newArr = [];
        if(type === "TODO"){
            newArr = [...this.state.inProgresTaskArr]
            newArr.push(this.state.toDoTaskArray[index]);
            this.setState({
                inProgresTaskArr:newArr
            })
        } else if(type === "INPROGRESS"){
            newArr = [...this.state.doneTaskArr]
            newArr.push(this.state.inProgresTaskArr[index]);
            this.setState({
                doneTaskArr:newArr
            })
        } else if(type==="DONE"){
            this.setState({
                isErrorModalVisible:true
            })
        }
        if(newArr.length>0){
            this.removeTask(index,type);
        }
    }

    moveLeft = (index,type) => {
        var newArr = [];
        if(type === "TODO"){
            this.setState({
                isErrorModalVisible:true
            })
        } else if(type === "INPROGRESS"){
            newArr = [...this.state.toDoTaskArray]
            newArr.push(this.state.inProgresTaskArr[index]);
            this.setState({
                toDoTaskArray:newArr
            })
        } else if(type==="DONE"){
            newArr = [...this.state.inProgresTaskArr]
            newArr.push(this.state.doneTaskArr[index]);
            this.setState({
                inProgresTaskArr:newArr
            })
        }
        if(newArr.length>0){
            this.removeTask(index,type);
        }
    }
    render(){

        return(
            <div>
                <Modal show ={this.state.isModalVisible} handleClose={(e)=>this.hideModal(e)}>
                    <h2>Enter New Task</h2>
                    <input type="text" value={this.state.newTask} onChange={(e)=>this.createNewTask(e)} onKeyDown={(e)=>this.saveTask(e)}/>
                </Modal>
                <Modal show ={this.state.isErrorModalVisible} handleClose={(e)=>this.hideModal(e)}>
                    <h2>Cannot perform this action</h2>
                </Modal>
                <div className="upper-half">
                    <a href="#" onClick={(e)=>this.openModal(e)} className="task-button">NEW TASK</a>
                </div>
                <div className="lower-half">
                    <div className= "task-containers">

                        <TODO taskArr={this.state.toDoTaskArray} 
                        moveLeft={(index,value)=>this.moveLeft(index,value)} 
                        moveRight={(index,value)=>this.moveRight(index,value)} 
                        cancel={(index,value)=>this.removeTask(index,value)}></TODO>

                        <INPROGRESS taskArr={this.state.inProgresTaskArr} 
                        moveLeft={(index,value)=>this.moveLeft(index,value)} 
                        moveRight={(index,value)=>this.moveRight(index,value)} 
                        cancel={(index,value)=>this.removeTask(index,value)}></INPROGRESS>

                        <DONE taskArr={this.state.doneTaskArr} 
                        moveLeft={(index,value)=>this.moveLeft(index,value)} 
                        moveRight={(index,value)=>this.moveRight(index,value)} 
                        cancel={(index,value)=>this.removeTask(index,value)}></DONE>
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default TODOPAGE;