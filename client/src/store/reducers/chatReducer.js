const initState={
    chatError:null
}

const chatReducer=(state= initState, action)=>{
    switch(action.type){
        case 'CREATE_CHAT':
            return state;
        case 'CREATE_CHAT_ERROR':
            return state;    
        default:
            return state
    }
}

export default chatReducer