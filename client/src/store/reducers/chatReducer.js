const initState={
    chatError:null
}

const chatReducer=(state= initState, action)=>{
    switch(action.type){
        case 'CREATE_CHAT':
            console.log(action.chat)
            return state;
        case 'CREATE_CHAT_ERROR':
            console.log(action.err)
            return state;    
        default:
            return state
    }
}

export default chatReducer