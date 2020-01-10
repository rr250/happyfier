import authReducer from './authReducer'
import projectReducer from './projectReducer'
import testReducer from './testReducer'
import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    test: testReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer