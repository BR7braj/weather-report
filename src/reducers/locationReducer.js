import {FETCH_COORDINATES,FETCH_WEATHER} from "../actions/types";

export const locationReducer  = (state  = {} , action) => {
    switch(action.type) {
        case FETCH_COORDINATES : 
        return {...state , coordinates  : action.coordinates}
        case FETCH_WEATHER : 
        return {...state , weather : action.weather}
        default  : return state; 
    }
}
