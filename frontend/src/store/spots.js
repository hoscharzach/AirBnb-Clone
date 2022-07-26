import { csrfFetch } from "./csrf";

const LOAD = '/spots/load'
const CREATE = '/spots/create'

const LOAD_REVIEWS = 'reviews/load'
const POST_REVIEW = 'reviews/post'

export const loadSpots = (spots) => {
    return {
        type: LOAD,
        spots
    }
}

export const createSpot = (spot) => {
    return {
        type: CREATE,
        spot
    }
}

export const thunkCreateSpot = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/currentUser/spots`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    if (response) {
        const data = await response.json()
        if (data.id) {
            dispatch(createSpot(data))
            return data.id
        }

    }
}

export const thunkLoadAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    if (response) {
        const data = await response.json()
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
        case CREATE:
            newState = {...state}
            newState.normalizedSpots[action.spot.id] = action.spot
            newState.list = [...state.list, action.spot]
            return newState
        default:
            return state
    }
}
