export const createProject=(project)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('projects').add({
            ...project,
            authorFirstName: 'rr',
            authorLastName:'7',
            authorId:12345,
            createdAt:new Date()
        }).then(()=>{
            dispath({type: 'CREATE_PROJECT', project});
        }).catch((err)=>{
            dispath({type: 'CREATE_PROJECT_ERROR', err});
        })
        
    }
};