import { USER_LOADING, LOGIN_USER, LOGOUT_USER, SET_ERROR, RESET_ERROR, GET_USER } from '../actions/types'
import axios from 'axios'
import cookie from 'js-cookie'
import setAuthToken from '../utils/setAuthToken'

export const registerUser = (formData, x) => async dispatch => {
    try {
        dispatch({
            type: USER_LOADING
        })
        const config = {
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            }
        }
        const response = await axios.post('http://localhost:5000/api/user/register', formData, config)
        if (response.data.msg !== "User created" || response.data.msg !== "Login")
            dispatch(loginUser(formData))
        else
            throw new Error('Internal Server Error')
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

export const loginUser = (formData) => async dispatch => {
    try {
        dispatch({
            type: USER_LOADING
        })
        const config = {
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            }
        }
        const response = await axios.post('http://localhost:5000/api/user/login', formData, config)
        dispatch({
            type: LOGIN_USER,
            payload: response.data
        })        
        setAuthToken(response.data)
        dispatch(getUser())
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

export const getUser = () => async dispatch => {
    try {
        const token = cookie.get('token')
        setAuthToken(token)
        dispatch({
            type: USER_LOADING
        })
        const response = await axios.get('http://localhost:5000/api/user/get')
        console.log(response.data)
        dispatch({
            type: GET_USER,
            payload: response.data
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

export const logoutUser = () => async dispatch => {
    try {
        dispatch({
            type: LOGOUT_USER
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