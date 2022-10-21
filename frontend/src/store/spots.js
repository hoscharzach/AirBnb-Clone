import { csrfFetch } from "./csrf";

const LOAD = '/spots/load'
const CREATE = '/spots/create'
const UPDATE = '/spots/update'
const DELETE = '/spots/delete'
const ADD_REVIEW = '/spot/add_review'
const EDIT_REVIEW = '/spot/edit_review'
const DELETE_REVIEW = '/spot/delete_review'

export const deleteReview = (reviewId, spotId) => {
    return {
        type: DELETE_REVIEW,
        reviewId,
        spotId
    }
}

export const createReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}
export const editReview = (review, spotId) => {
    return {
        type: EDIT_REVIEW,
        review,
        spotId
    }
}

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

export const thunkDeleteReview = (reviewId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/currentUser/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteReview(reviewId, spotId))
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkEditReview = (review) => async dispatch => {

    const response = await csrfFetch(`/api/currentUser/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json()
        return dispatch(editReview(data, review.spotId))
    } else throw response

}
export const thunkCreateReview = (review) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json()
        return dispatch(createReview(data))
    } else {
        const errors = await response.json()
        return errors
    }

}

export const thunkCreateSpot = (payload) => async dispatch => {

    const formData = new FormData()
    for (let key in payload) {
        if (key !== 'images') {
            formData.append(key, payload[key])
        } else {
            for (let i = 0; i < payload.images.length; i++) {
                formData.append("images", payload.images[i])
            }
        }
    }

    // for (let key of formData.entries()) {
    //     console.log(key[0] + ', ' + key[1])
    // }
    const response = await csrfFetch(`/api/currentUser/spots`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createSpot(data))
        return data.id
    } else {
        const errors = await response.json()
        return errors
    }
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

        case DELETE_REVIEW:
            return {
                ...state,
                normalizedSpots: {
                    ...state.normalizedSpots,
                    [action.spotId]: {
                        ...state.normalizedSpots[action.spotId],
                        Reviews: state.normalizedSpots[action.spotId].Reviews.filter(rev => rev.id !== action.reviewId)
                    }
                }
            }

        case ADD_REVIEW:
            return {
                ...state,
                normalizedSpots: {
                    ...state.normalizedSpots,
                    [action.review.spotId]: {
                        ...state.normalizedSpots[action.review.spotId],
                        Reviews: [
                            action.review,
                            ...state.normalizedSpots[action.review.spotId].Reviews
                        ]
                    }
                }
            }

        case EDIT_REVIEW:
            return {
                ...state,
                normalizedSpots: {
                    ...state.normalizedSpots,
                    [action.spotId]: {
                        ...state.normalizedSpots[action.spotId],
                        Reviews: state.normalizedSpots[action.spotId].Reviews.map(rev => rev.id === action.review.id ? action.review : rev)
                    }
                }
            }

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
