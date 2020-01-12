const initState={
    authError:null
}

const projectReducer=(state= initState,action)=>{
    switch(action.type){
        case 'ADD_TOKEN':
            console.log(action.token)
            return state;
        case 'ADD_TOKEN_ERROR':
            console.log(action.err)
            return state;   
        case 'UPDATE_STREAK':
            console.log(action.token)
            return state;
        case 'UPDATE_STREAK_ERROR':
            console.log(action.err)
            return state;    
        case 'TOGGLE_BOOKMARK':
            console.log(state);
            return state;
        case 'TOGGLE_BOOKMARK_ERROR':
            console.log(action.err)
            return state; 
        default:
            return state
    }
}

export default projectReducer