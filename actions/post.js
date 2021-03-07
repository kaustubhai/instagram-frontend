import axios from 'axios'
import { LOAD_POST, POST_LOADING, SET_ERROR, RESET_ERROR } from './types'

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

export const getLiked = () => async dispatch => {
    try {
        dispatch({
            type: POST_LOADING
        })
        const posts = await axios.get('http://localhost:5000/api/post/liked')
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

export const likePost = (id) => async dispatch => {
    try {
        dispatch({
            type: POST_LOADING
        })
        const res = await axios.get(`http://localhost:5000/api/like/${id}`)
        console.log(res.data)
        if (res.data.msg !== "Post liked")
            throw Error("")
        dispatch(getAllPosts())
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

export const addPost = (formData) => async dispatch => {
    try {
        dispatch({
            type: POST_LOADING
        })
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        }
        const res = await axios.post('http://localhost:5000/api/post', formData, config)
        console.log(res)
        dispatch(getAllPosts())
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