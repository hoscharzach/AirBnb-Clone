import { csrfFetch } from "./csrf"

const LOAD = '/reviews/load'
const POST = '/reviews/post'
const EDIT = '/reviews/edit'
const DELETE = '/review/delete'

export const deleteReview = (review) => {
    return {
        type: DELETE,
        review
    }
}

export const createReview = (review) => {
    return {
        type: POST,
        review
    }
}
export const editReview = (review) => {
    return {
        type: EDIT,
        review
    }
}
export const loadReviews = (reviews) => {
    return {
        type: LOAD,
        reviews
    }
}
export const thunkDeleteReview = (review) => async dispatch => {
    const response = await csrfFetch(`/api/currentUser/reviews/${review.id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        return dispatch(deleteReview(review))
    } else throw response
}

export const thunkEditReview = (review) => async dispatch => {

    const response = await csrfFetch(`/api/currentUser/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json()
        return dispatch(editReview(data))
    } else throw response

}
export const thunkCreateReview = (review) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json()
        return dispatch(createReview(data))
    } else throw response

}

export const thunkLoadReviews = () => async dispatch => {
    const response = await csrfFetch('/api/reviews')

    if (response) {
        const allReviews = await response.json()
        return dispatch(loadReviews(allReviews))
    } else throw response
}
const initialState = {normalizedReviews: {}}

export function reviewsReducer (state = initialState, action) {
    let newState
    switch(action.type) {
        case DELETE:
            newState = structuredClone(state)
            delete newState.normalizedReviews[action.review.id]
            return newState
        case EDIT:
            newState = structuredClone(state)
            newState.normalizedReviews[action.review.id] = action.review
            return newState
        case POST:
            newState = structuredClone(state)
            newState.normalizedReviews[action.review.id] =
            action.review
            return newState
        case LOAD:
            newState = structuredClone(state)
            action.reviews.forEach(review => {
                newState.normalizedReviews[review.id] = review
            })
            return newState
        default:
            return state
    }
}
