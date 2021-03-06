export const addToken=(token)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const Id = getState().firebase.auth.uid;
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
        data.mode===1 ? firestore.collection('users').doc(Id).update({
            streak: data.streak,
            lastUpdated:new Date()
        }):firestore.collection('users').doc(Id).update({
            streak: data.streak,
        }).then(()=>{
            dispath({type: 'UPDATE_STREAK', data});
        }).catch((err)=>{
            dispath({type: 'UPDATE_STREAK_ERROR', err});
        })
    }
};

export const toggleBookMark=(id,projectId)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const firebase=getFirebase();
        const profile = getState().firebase.profile;
        const isBookmarked = profile.bookMarks.includes(projectId);
        firestore.collection('users').doc(id).update({
            bookMarks: !isBookmarked ? firebase.firestore.FieldValue.arrayUnion(projectId) : firebase.firestore.FieldValue.arrayRemove(projectId),
            latestBookmark: projectId
            }).then(()=>{
            dispath({type: 'TOGGLE_BOOKMARK', id});
        }).catch((err)=>{
            dispath({type: 'TOGGLE_BOOKMARK_ERROR', err});
        })
    }
};

export const toggleStatus=(id)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const firebase=getFirebase();
        const profile = getState().firebase.profile;
        firestore.collection('users').doc(id).update({
            status: !profile.status
            }).then(()=>{
            dispath({type: 'TOGGLE_STATUS', id});
        }).catch((err)=>{
            dispath({type: 'TOGGLE_STATUS_ERROR', err});
        })
    }
}