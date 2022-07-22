import { csrfFetch } from "./csrf"

const LOGIN = 'users/login'
const LOGOUT = 'users/logout'


const initialState = {
    user: null
}

const login = (user) => {
    return {
        type: LOGIN,
        user
    }
}

const logout = () => {
    return {
        type: LOGOUT
    }
}

export const thunkLogout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    if (response) {
        dispatch(logout())
    } else throw response
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

    if (response) {
        const data = await response.json()
        dispatch(login(data))
        return data
    } else throw response
}



export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return initialState
        case LOGIN:
            const newState = {...state}
            newState.user = {
                id: action.user.safeUser.id,
                email: action.user.safeUser.email,
                username: action.user.safeUser.username
            }
            return newState
        default:
            return state
    }
}
