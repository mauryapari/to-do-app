const initialState = {
    isModalVisible: true,
    toDo: [],
    inProgress: [],
    done: [],
    newTask: '',
    isErrorModalVisible: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "CREATE_NEW":
            console.log(action.payload.target.value);
            return {
                ...state,
                newTask: action.payload.target.value
            }
        case "SAVE_TASK":
            if (action.payload.key == 'Enter' || action.payload.keyCode == 13) {
                const data = {
                    task: state.newTask
                }
                const id = Math.round(Math.random() * 10000000);
                let newTaskArr = [...state.toDo];
                newTaskArr.push({ task: state.newTask, id: id });
                return {
                    ...state,
                    toDo: newTaskArr,
                    newTask: '',
                    isModalVisible: false
                }
            }
            return state;
        case "REMOVE":
            return {
                ...state,
                [action.payload.value]: state[action.payload.value].filter(item => item.id !== action.payload.index)
            }

        case "MOVE_RIGHT":
            var type = action.payload.type;
            var moveToType = null;
            var item = state[action.payload.type].find(item => item.id === action.payload.index);

            if (type === "toDo") {
                moveToType = 'inProgress'
            } else if (type === "inProgress") {
                moveToType = 'done'
            } else if (type === "done") {
                this.setState({
                    isErrorModalVisible: true
                })
                return
            }
            const id = Math.round(Math.random() * 10000000);
            let newTaskArr = [...state[moveToType]];
            newTaskArr.push({ task: item.task, id: id });

            return {
                ...state,
                [action.payload.type]: state[action.payload.type].filter(item => item.id !== action.payload.index),
                [moveToType]: newTaskArr
            }

        case "MOVE_LEFT":
            var type = action.payload.type
            var moveToType = null;
            var item = state[type].find(item => item.id === action.payload.index);

            if (type === "toDo") {
                return{
                    ...state,
                    isErrorModalVisible:true
                }
            } else if (type === "inProgress") {
                moveToType = 'toDo'
            } else if (type === "done") {
                moveToType = 'inProgress'
            }
            const Id = Math.round(Math.random() * 10000000);
            let newArr = [...state[moveToType]];
            newArr.push({ task: item.task, id: Id });
            return {
                ...state,
                [action.payload.type]: state[action.payload.type].filter(item => item.id !== action.payload.index),
                [moveToType]: newTaskArr
            }
        default:
            return state;
    }
}