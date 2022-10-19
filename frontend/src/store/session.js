import { csrfFetch } from "./csrf"

const SET_USER = 'user/set'
const DELETE_USER = 'user/delete'
const REMOVE_BOOKING = 'user/remove_booking'

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const deleteUser = () => {
    return {
        type: DELETE_USER,
    }
}

const removeBooking = (id) => ({
    type: REMOVE_BOOKING,
    id
})

const initialState = {
    user: null
}

export const thunkSignup = (body) => async dispatch => {
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    dispatch(setUser(data.returnUser))
    return data

}

export const thunkRestoreSession = () => async dispatch => {
    const response = await csrfFetch('/api/session')
    const data = await response.json()
    return dispatch(setUser(data.user))
}

export const thunkLogout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    })
    dispatch(deleteUser())
    return response
}


export const thunkLogin = (credentials) => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            credential: credentials.credential,
            password: credentials.password
        })
    })
    const data = await response.json()
    dispatch(setUser(data.safeUser))
    return response
}

export const thunkDeleteBooking = (id) => async dispatch => {
    const res = await csrfFetch(`/api/currentUser/bookings/${id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        return dispatch(removeBooking(id))
    } else {
        const errors = await res.json()
        return errors
    }
}



export const sessionReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case REMOVE_BOOKING:
            return {
                ...state,
                user: {
                    ...state.user,
                    Bookings: [
                        ...state.user.Bookings.filter(booking => booking.id !== action.id)
                    ]
                }
            }
        case SET_USER:
            return {
                user: action.user
            }
        case DELETE_USER:
            return initialState
        default:
            return state
    }
}
