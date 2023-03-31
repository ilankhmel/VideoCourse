import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux"
import thunk from 'redux-thunk'
import { courseReducer } from "./reducers/course.reducer"
const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    courseModule: courseReducer,
})

export const store = createStore(rootReducer, composedEnhancers(applyMiddleware(thunk)))