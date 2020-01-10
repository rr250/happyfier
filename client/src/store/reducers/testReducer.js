const initState={
    tests: [
        {id: '1', score: 'help me find peach', testName: 'blah blah blah'},
        {id: '2', score: 'collect all the stars', testName: 'blah blah blah'},
        {id: '3', score: 'egg hunt with yoshi', testName: 'blah blah blah'}
      ]
}

const testReducer=(state= initState, action)=>{
    switch(action.type){
        case 'CREATE_TEST':
            console.log(action.test)
            return state;
        case 'CREATE_TEST_ERROR':
            console.log(action.err)
            return state;    
        default:
            return state
    }
}

export default testReducer