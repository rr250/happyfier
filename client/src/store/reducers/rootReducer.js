import authReducer from './authReducer'
import projectReducer from './projectReducer'
import userReducer from './userReducer'
import chatReducer from './chatReducer';
import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    user: userReducer,
    chat: chatReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer