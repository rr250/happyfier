export const signIn=(credentials)=>{
    return(dispath, getState,{getFirebase})=>{
        const firebase=getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(()=>{
            dispath({type:'LOGIN_SUCCESS'})
        }).catch((err)=>{
            dispath({type:'LOGIN_ERROR',err})
        });
    }
}

export const signOut=()=>{
    return(dispath,getState,{getFirebase})=>{
        const firebase=getFirebase();
        
        firebase.auth().signOut().then(()=>{
            dispath({type:'SIGNOUT_SUCCESS'});
        });
    }
}

export const signUp = (newUser)=>{
    return(dispatch, getState,{getFirebase, getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0]+newUser.lastName[0]
            })
        }).then(()=>{
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(err=>{
            dispatch({type:'SIGNUP_ERROR', err})
        })
    }
}

export const signUpWithGoogle = ()=>{
    return(dispatch, getState,{getFirebase, getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider)
        .then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: resp.user.displayName.split(" ")[0],
                lastName: resp.user.displayName.split(" ")[1],
                initials: resp.user.displayName.split(" ")[0][0]+resp.user.displayName.split(" ")[0][0]
            })
        }).then(()=>{
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(err=>{
            dispatch({type:'SIGNUP_ERROR', err})
        })
    }
}