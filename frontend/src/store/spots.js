import { csrfFetch } from "./csrf";

const LOAD = '/spots/load'


export const loadSpots = (spots) => {
    return {
        type: LOAD,
        spots
    }
}

export const thunkLoadAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    if (response) {
        const data = await response.json()
        console.log(data)
        const spots = data.spots
        dispatch(loadSpots(spots))
    }
}


const initialState = {normalizedSpots: {}, list: []}

export function spotsReducer (state = initialState, action) {
    let newState
    switch(action.type) {
        case LOAD:
            newState = {...state}
            action.spots.forEach(spot => newState.normalizedSpots[spot.id] = spot)
            newState.list = [...action.spots]
            return newState
        default:
            return state
    }
}
