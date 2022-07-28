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

    if (response) {
        const data = await response.json()
        if (data.id) {
            dispatch(createSpot(data))
            return data.id
        }

    }
}

export const thunkDeleteSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/currentUser/spots/${id}`, {
        method: 'DELETE'
    })

    if (response) {
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


const initialState = {normalizedSpots: {}, list: []}

export function spotsReducer (state = initialState, action) {
    let newState
    switch(action.type) {
        case DELETE:
            newState = structuredClone(state)
            delete newState.normalizedSpots[action.id]
            newState.list = [...Object.values(newState.normalizedSpots)]
            return newState
        case UPDATE:
            newState = structuredClone(state)
            newState.normalizedSpots[action.spot.id] = action.spot
            newState.list = [...Object.values(newState.normalizedSpots)]
            return newState
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
