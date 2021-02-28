import React, { Component } from 'react';
import instance from '../../firebase/instance';

import TODO from '../TODO/todo';
import INPROGRESS from '../InProgressTask/inProgress';
import DONE  from '../DoneTask/done';
import Modal from '../../components/modals/modal'
import Spinner from '../../components/Spinner/spinner';

import '../../scss/main.scss';
import '../../scss/toDoPage.scss';

class TODOPAGE extends Component{
    state = {
        isModalVisible:false,
        toDo:[],
        inProgress:[],
        done:[],
        newTask:'',
        isErrorModalVisible : false
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        this.showSpinner();

        instance.get("/tasks.json").then(resp=>{
            if(resp && resp.status === 200) {
                 for(let key in resp.data){
                    let taskArr =[]
                     for(let k in resp.data[key]){
                        taskArr.push({id:k,task:resp.data[key][k].task})
                     }
                     this.setState({
                         [key]:taskArr
                     },()=>{
                        this.hideSpinner();
                    })
                 }
            }
        })
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

    moveTask(task,type) {
        this.showSpinner();
        const data = {
            task:task
        }
        instance.post('/tasks/'+type+'.json',data).then(resp=>{
            let newTaskArr=[...this.state[type]];
                newTaskArr.push({task:task,id:resp.data.name});
                this.setState({
                    [type]:newTaskArr,
                },()=>{
                    this.hideSpinner();
                })
        })

    }

    saveTask = (e) => {
        if(e.key=='Enter' || e.keyCode == 13){
            this.showSpinner();
            const data = {
                task:this.state.newTask
            }
            instance.post("/tasks/toDo.json",data).then(resp=>{
                let newTaskArr=[...this.state.toDo];
                newTaskArr.push({task:this.state.newTask,id:resp.data.name});
                this.setState({
                    toDo:newTaskArr,
                    isModalVisible:false,
                    newTask:''
                },()=>{
                    this.hideSpinner();
                })
            })
        }
    }

    removeTask=(index,type)=>{
        this.showSpinner();
        console.log("[remove]",index)
        instance.delete('/tasks/'+type+'/'+index+'.json').then(resp=>{
            if(resp && resp.status === 200) {
                this.setState({
                    [type] : this.state[type].filter(item=> item.id !== index)
                },()=>{
                    this.hideSpinner();
                })
            }
        })
    }

    moveRight = (index,type) => {
        var moveToType = null;
        var item = this.state[type].find(item=> item.id === index);

        if(type === "toDo"){
            moveToType = 'inProgress'
        } else if(type === "inProgress"){
            moveToType = 'done'
        } else if(type==="done"){
            this.setState({
                isErrorModalVisible:true
            })
            return
        }
        console.log("[right][type][movetoType]",index,type,item,moveToType);
        this.removeTask(index,type)
        this.moveTask(item.task,moveToType);
    }

    moveLeft = (index,type) => {
        var moveToType = null;
        var item = this.state[type].find(item=> item.id === index);

        if(type === "toDo"){
            this.setState({
                isErrorModalVisible:true
            })
            return
        } else if(type === "inProgress"){
            moveToType = 'toDo'
        } else if(type==="done"){
            moveToType = 'inProgress'
            
        }
        console.log("[left][type][movetoType]",index,type,item,moveToType);
        this.removeTask(index,type)
        this.moveTask(item.task,moveToType);
        
    }

    showSpinner =() => {
        this.setState({
            showSpinner:true
        })
    }

    hideSpinner =() => {
        this.setState({
            showSpinner:false
        })
    }

    render(){

        return(
            <div>
                {this.state.showSpinner ? <Spinner></Spinner> : null}
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

                        <TODO taskArr={this.state.toDo} 
                        moveLeft={(index,value)=>this.moveLeft(index,value)} 
                        moveRight={(index,value)=>this.moveRight(index,value)} 
                        cancel={(index,value)=>this.removeTask(index,value)}></TODO>

                        <INPROGRESS taskArr={this.state.inProgress} 
                        moveLeft={(index,value)=>this.moveLeft(index,value)} 
                        moveRight={(index,value)=>this.moveRight(index,value)} 
                        cancel={(index,value)=>this.removeTask(index,value)}></INPROGRESS>

                        <DONE taskArr={this.state.done} 
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