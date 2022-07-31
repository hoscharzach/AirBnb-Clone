import { csrfFetch } from "./csrf"

// const LOGIN = 'users/login'
// const LOGOUT = 'users/logout'
// const RESTORE = 'users/restore'
// const SIGNUP = 'users/signup'

const SET_USER = 'user/set'
const DELETE_USER = 'user/delete'

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
        console.log(data)
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



export const sessionReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
            case SET_USER:
                newState = structuredClone(state)
                newState.user = action.user
                return newState
            case DELETE_USER:
                newState = structuredClone(state)
                newState.user = null
                return newState
        default:
            return state
    }
}
