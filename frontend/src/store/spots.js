import { csrfFetch } from "./csrf";

const LOAD = '/spots/load'
const CREATE = '/spots/create'
const UPDATE = '/spots/update'
const DELETE = '/spots/delete'

export const loadSpots = (spots) => {
    return {
        type: LOAD,
        spots
    }
}
export const deleteSpot = (id) => {
    return {
        type: DELETE,
        id
    }
}

export const createSpot = (spot) => {
    return {
        type: CREATE,
        spot
    }
}

export const updateSpot = (spot) => {
    return {
        type: UPDATE,
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

    if (response.ok) {
        const data = await response.json()
        dispatch(createSpot(data))
        return data.id
    } else throw response
}

export const thunkDeleteSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/currentUser/spots/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = response.json()
        dispatch(deleteSpot(id))
        return data
    } else throw response
}

export const thunkUpdateSpot = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/currentUser/spots/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json()
        return dispatch(updateSpot(data))
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


const initialState = {normalizedSpots: {}}

export function spotsReducer (state = initialState, action) {
    let newState
    switch(action.type) {
        case DELETE:
            newState = structuredClone(state)
            delete newState.normalizedSpots[action.id]
            return newState
        case UPDATE:
            newState = structuredClone(state)
            newState.normalizedSpots[action.spot.id] = action.spot
            return newState
        case LOAD:
            newState = structuredClone(state)
            action.spots.forEach(spot => newState.normalizedSpots[spot.id] = spot)
            return newState
        case CREATE:
            newState = structuredClone(state)
            newState.normalizedSpots[action.spot.id] = action.spot
            return newState
        default:
            return state
    }
}
