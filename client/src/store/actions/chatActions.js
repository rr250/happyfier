export const createChat=(messagesId)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        console.log(messagesId)
        firestore.collection('messages').doc(messagesId).set({
            
        }).then(()=>{
            dispath({type: 'CREATE_CHAT', messagesId});
        }).catch((err)=>{
            dispath({type: 'CREATE_CHAT_ERROR', err});
        })
    }
}

export const postMessage=(data)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const firebase=getFirebase();
        const profile = getState().firebase.profile;
        const messageDoc={
            userId : getState().firebase.auth.uid,
            messageDate : new Date(),
            userFirstName : profile.firstName,
            userLastName : profile.lastName,
            content : data.content,
            userInitials: profile.firstName[0]+profile.lastName[0],
        };
        firestore.collection('messages').doc(data.messagesId).update({
            messages: firebase.firestore.FieldValue.arrayUnion(messageDoc)
        }).then(()=>{
            dispath({type: 'CREATE_CHAT', data});
        }).catch((err)=>{
            dispath({type: 'CREATE_CHAT_ERROR', err});
        })
    }
}