import { csrfFetch } from "./csrf"

const LOGIN = 'users/login'
const LOGOUT = 'users/logout'
const RESTORE = 'users/restore'
const SIGNUP = 'users/signup'


const initialState = {
    user: null
}

export const signup = (user) => {
    return {
        type: SIGNUP,
        user
    }
}

export const login = (user) => {
    return {
        type: LOGIN,
        user
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const restore = (user) => {
    return {
        type: RESTORE,
        user
    }
}

export const thunkSignup = (body) => async dispatch => {
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (response) {
        const data = await response.json()
        const { returnUser:user } = data
        dispatch(signup(user))
        return data
    } else throw response
}

export const thunkRestoreSession = () => async dispatch => {
    const response = await csrfFetch('/api/session')

    if (response) {
        const user = await response.json()
        const { username } = user
        if (username){
            dispatch(restore(user))
        }
        else return user.message
    } else return response
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
    let newState
    switch (action.type) {
        case SIGNUP:
            newState = {...initialState}
            newState.user = {
                id: action.user.id,
                email: action.user.email,
                username: action.user.username
            }
            return newState
        case RESTORE:
            newState = {...initialState}
            newState.user = {
                id: action.user.user.id,
                email: action.user.user.email,
                username: action.user.user.username
            }
            return newState
        case LOGOUT:
            return {...initialState}
        case LOGIN:
            newState = {...state}
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
