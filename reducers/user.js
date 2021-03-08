import { USER_LOADING, LOGIN_USER, SET_ERROR, LOGOUT_USER, RESET_ERROR, GET_USER } from '../actions/types'
import cookie from 'js-cookie'

const initialState = {
    loading: false,
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
            cookie.set('token', action.payload)
            return {
                ...state
            }
        case GET_USER:
            return {
                user: action.payload,
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
                error: "",
            }
        default:
            return {...state}
    }
}

export default reducer