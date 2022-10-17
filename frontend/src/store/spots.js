import { csrfFetch } from "./csrf";

const LOAD = '/spots/load'
const CREATE = '/spots/create'
const UPDATE = '/spots/update'
const DELETE = '/spots/delete'
const ADD_BOOKING = '/spots/add_booking'

const addBooking = (data) => ({
    type: ADD_BOOKING,
    data
})

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



export const thunkAddBooking = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${payload.spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addBooking(data))
    } else {
        return response
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


const initialState = { normalizedSpots: {} }

export function spotsReducer(state = initialState, action) {
    let newState
    switch (action.type) {

        case ADD_BOOKING:
            console.log(action.data)
            return state

        case DELETE:
            newState = { ...state }
            delete newState.normalizedSpots[action.id]
            return newState
        case UPDATE:
            return {
                ...state,
                normalizedSpots: {
                    ...state.normalizedSpots,
                    [action.spot.id]: action.spot
                }
            }
        case LOAD:
            let spots = {}
            action.spots.forEach(spot => spots[spot.id] = spot)
            return {
                ...state,
                normalizedSpots: {
                    ...state.normalizedSpots,
                    ...spots
                }
            }
        case CREATE:
            return {
                ...state,
                normalizedSpots: {
                    ...state.normalizedSpots,
                    [action.spot.id]: action.spot
                }
            }
        default:
            return state
    }
}
