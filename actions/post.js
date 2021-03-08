import axios from 'axios'
import { LOAD_POST, POST_LOADING, SET_ERROR, RESET_ERROR } from './types'
import { toast } from 'react-toastify'
const toastConfig = {
    position: "bottom-center",
    pauseOnHover: false,
    draggable: false,
    autoClose: 3000
}
export const getAllPosts = () => async dispatch => {
    try {
        dispatch({
            type: POST_LOADING
        })
        const posts = await axios.get('https://instagram696-backend.herokuapp.com/api/all')
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
        const posts = await axios.get('https://instagram696-backend.herokuapp.com/api/post/liked')
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
        const res = await axios.get(`https://instagram696-backend.herokuapp.com/api/like/${id}`)
        if (res.data.msg !== "Post liked")
            throw Error("")
        dispatch(getAllPosts())
        toast.dark('Post liked', toastConfig)
    } catch (error) {
        console.log(error)
        toast.error('Internal Server Error', toastConfig)
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
        const res = await axios.post('https://instagram696-backend.herokuapp.com/api/post', formData, config)
        if (res.data.msg === "Post created") {
            dispatch(getAllPosts())
            toast.dark('Post Added', toastConfig)    
        }
        else {
            throw Error("Image should be less than 2mb")
        }
    } catch (error) {
        console.log(error)
        toast.error('Image should be less than 2mb', toastConfig)
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