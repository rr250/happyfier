export const createProject=(project)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        if(project.anon===false && project.diary===false){
            firestore.collection('projects').add({
                title:project.title,
                content:project.content,
                anon: project.anon,
                authorFirstName: profile.firstName,
                authorLastName:profile.lastName,
                authorId:authorId,
                diary:false,
                createdAt:new Date(),
                BookMarked: false
            }).then(()=>{
                dispath({type: 'CREATE_PROJECT', project});
            }).catch((err)=>{
                dispath({type: 'CREATE_PROJECT_ERROR', err});
            })
        }
        else if(project.anon===true && project.diary===false){
            firestore.collection('projects').add({
                title:project.title,
                content:project.content,
                anon: project.anon,
                authorFirstName: "Anonymous",
                authorLastName: "User",
                authorId:authorId,
                diary:false,
                createdAt:new Date(),
                BookMarked: false
            }).then(()=>{
                dispath({type: 'CREATE_PROJECT', project});
            }).catch((err)=>{
                dispath({type: 'CREATE_PROJECT_ERROR', err});
            })
        }
        else{
            firestore.collection('projects').add({
                title:project.title,
                content:project.content,
                anon: project.anon,
                authorFirstName: profile.firstName,
                authorLastName:profile.lastName,
                authorId:authorId,
                diary:true,
                createdAt:new Date(),
                BookMarked: false
            }).then(()=>{
                dispath({type: 'CREATE_PROJECT', project});
            }).catch((err)=>{
                dispath({type: 'CREATE_PROJECT_ERROR', err});
            })
        }    
    }
};

export const deleteProject=(id)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('projects').doc(id).delete(
        ).then(()=>{
            dispath({type: 'DELETE_PROJECT', id});
        }).catch((err)=>{
            dispath({type: 'CREATE_PROJECT_ERROR', err});
        })
    }
};

export const postComment=(data)=>{
    return(dispath, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const firebase=getFirebase();
        const profile = getState().firebase.profile;
        const commentDoc={
            commenterId : getState().firebase.auth.uid,
            commentDate : new Date(),
            commenterFirstName : profile.firstName,
            commenterLastName : profile.lastName,
            comment : data.comment
        };
        firestore.collection('projects').doc(data.projectId).update({
            comments: firebase.firestore.FieldValue.arrayUnion(commentDoc)
        })
    }
}
