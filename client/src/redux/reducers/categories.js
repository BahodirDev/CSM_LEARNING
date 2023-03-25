import React from 'react'

const initialState = {
    categories:[]
}

function categories(state = initialState,{type,payload}) {
    switch (type) {
        case "LOAD_CATEGORIES":
            return{
                ...state,
                categories:payload
            }
        case "UPDATE_CATEGORIES":
            return{
                ...state,
                categories:state.categories.map((s)=>{
                    if(s._id == payload.id){
                        return{
                            ...s,
                            name:payload.name
                        }
                    }else{
                        return s;
                    }
                })
            }
        case "ADD_CATEGORIES":
            return{
                ...state,
                categories:[...state.categories,payload]
            }
        case "DELETE_CATEGORIES":
            return{
                ...state,
                categories:state.categories.filter(s=>s._id !== payload)
            }
        default:
            return state;
    }
}

export default categories