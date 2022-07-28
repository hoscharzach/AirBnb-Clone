import { csrfFetch } from "./csrf"

const LOAD = '/reviews/load'
const POST = '/reviews/post'
const EDIT = '/reviews/edit'

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
const initialState = {list: [], normalizedReviews: {}}

export function reviewsReducer (state = initialState, action) {
    let newState
    switch(action.type) {
        case EDIT:
            newState = structuredClone(state)
            newState.normalizedReviews[action.review.spotId] = action.review
            newState.list.map((el, i) => el.id === action.review.id ? newState.list[i] = action.review : el)
            return newState
        case POST:
            newState = structuredClone(state)
            newState.list = [...newState.list, action.review]
            newState.normalizedReviews[action.review.spotId] ? newState.normalizedReviews[action.review.spotId] = [...newState.normalizedReviews[action.review.spotId], action.review] : newState.normalizedReviews[action.review.spotId] = [action.review]
            return newState
        case LOAD:
            // add all reviews to the list for easy mapping/filtering
            newState = {...state}
            newState.list = [...action.reviews]

            // organize all reviews by their spots for easy reference
            action.reviews.forEach(review => {

                //ugly can probably refactor this
                newState.normalizedReviews[review.spotId] === undefined ? newState.normalizedReviews[review.spotId] = [review] : newState.normalizedReviews[review.spotId] = [...newState.normalizedReviews[review.spotId], review]
            })
            return newState
        default:
            return state
    }
}
