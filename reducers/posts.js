import { POST_LOADING, POST_POST, LOAD_POST, SET_ERROR, RESET_ERROR } from '../actions/types'

const initialState = {
    posts: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            }
        case LOAD_POST:
            return {
                loading: false,
                posts: action.payload
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
            return { ...state }
    }
}

export default reducer