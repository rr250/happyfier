const initState={
    authError:null
}

const authReducer=(state= initState, action)=>{
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state,
                authError: 'Login Failed'
            };
        case 'LOGIN_SUCCESS':
            console.log('login success')
            return {
                ...state,
                authError: 'null'
            };
        case 'SIGNOUT_SUCCESS':
            console.log('sign out');
            return state; 
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null
            } 
        case 'SIGNUP_ERROR':
            console.log('signup error');
            console.log(action.err.message);
            var a = action.err.message;
            return{
                ...state,
                authError: a.toString()
            }     
        default:
            return state
    }
}

export default authReducer