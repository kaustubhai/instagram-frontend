import { USER_LOADING, LOGIN_USER, SET_ERROR, LOGOUT_USER, RESET_ERROR } from '../actions/types'
import cookie from 'js-cookie'

const initialState = {
    loading: true,
    user: {},
    error: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case LOGIN_USER:
            cookie.set('token', action.payload.res)
            return {
                user: action.payload.x,
                loading: false
            }
        case LOGOUT_USER:
            cookie.remove('token')
            return {
                user: {},
                loading: false
            }
        case SET_ERROR: 
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case RESET_ERROR:
            return {
                ...state,
                error: ""
            }
        default:
            return {...state}
    }
}

export default reducer