import {useReducer} from 'react';

function reducer(state,action){
    console.log(state);
    return{
        ...state,
        [action.name] : action.value
    };
}

export default function useInputs(initState){
    const[state,dispatch] = useReducer(reducer,initState);
    const onChange = e =>{
        dispatch(e.target);
    }
    return[state,onChange];
}