import { POST_LOADING, POST_POST, LOAD_POST, LIKED_POST, CREATED_POST } from '../actions/types'

const initialState = {
    posts: [],
    loading: true
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
        default:
            return { ...state }
    }
}

export default reducer