import axios from 'axios'
import { LOAD_POST, POST_LOADING } from './types'

export const getAllPosts = () => async dispatch => {
    try {
        dispatch({
            type: POST_LOADING
        })
        const posts = await axios.get('http://localhost:5000/api/all')
        dispatch({
            type: LOAD_POST,
            payload: posts.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: SET_ERROR,
            payload: "Internal Server Error"
        })
        setTimeout(() => {
            dispatch({
                type: RESET_ERROR
            })
        }, 3000)
    }
}