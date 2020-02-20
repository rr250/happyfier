const initState={
    authError:null
}

const projectReducer=(state= initState,action)=>{
    switch(action.type){
        case 'ADD_TOKEN':
            return state;
        case 'ADD_TOKEN_ERROR':
            return state;   
        case 'UPDATE_STREAK':
            return state;
        case 'UPDATE_STREAK_ERROR':
            return state;    
        case 'TOGGLE_BOOKMARK':
            return state;
        case 'TOGGLE_BOOKMARK_ERROR':
            return state;
        case 'TOGGLE_STATUS':
            return state;
        case 'TOGGLE_STATUS_ERROR':
            return state; 
        default:
            return state
    }
}

export default projectReducer