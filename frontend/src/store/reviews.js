import { csrfFetch } from "./csrf"

const LOAD = 'reviews/load'
// const POST = 'reviews/post'

export const loadReviews = (reviews) => {
    return {
        type: LOAD,
        reviews
    }
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
