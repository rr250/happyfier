export const createTest=(test)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('tests').add({
            ...test,
            authorFirstName: profile.firstName,
            authorLastName:profile.lastName,
            authorId:authorId,
            createdAt:new Date()
        }).then(()=>{
            dispath({type: 'CREATE_TEST', test});
        }).catch((err)=>{
            dispath({type: 'CREATE_TEST_ERROR', err});
        })        
    }
};