import { createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { sessionReducer } from './session'
import { spotsReducer } from './spots'

const rootReducer = combineReducers({
    session: sessionReducer,
    spots: spotsReducer
})

let enhancer

if (process.env.NODE_ENV !== 'production') {
    const logger = require('redux-logger').default
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    enhancer = composeEnhancers(applyMiddleware(thunk, logger))
} else enhancer = applyMiddleware(thunk)

const configureStore = (preloadedstate) => {
    return createStore(rootReducer, preloadedstate, enhancer)
}

export default configureStore
