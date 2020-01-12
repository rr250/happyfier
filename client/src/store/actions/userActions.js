export const addToken=(token)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const Id = getState().firebase.auth.uid;
        console.log(token);
        firestore.collection('users').doc(Id).update({
            token: token
        }).then(()=>{
            dispath({type: 'ADD_TOKEN', token});
        }).catch((err)=>{
            dispath({type: 'ADD_TOKEN_ERROR', err});
        })
    }
};

export const updateStreak=(data)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const Id = getState().firebase.auth.uid;
        console.log(data.streak);
        firestore.collection('users').doc(Id).update({
            streak: data.streak,
            lastUpdated:new Date()
        }).then(()=>{
            dispath({type: 'UPDATE_STREAK', data});
        }).catch((err)=>{
            dispath({type: 'UPDATE_STREAK_ERROR', err});
        })
    }
};