import { combineReducers } from 'redux'
import userReducer from './user'
import postReducer from './posts'
const reducer = combineReducers({
    user: userReducer,
    posts: postReducer
})

export default reducer