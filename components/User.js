import React, { useState, useEffect } from 'react'
import {registerUser, logoutUser} from '../actions/user'
import { useSelector, useDispatch } from 'react-redux'
import style from '../styles/User.module.css'
import { GoogleLogin } from 'react-google-login';

const User = () => {
    const [photo, setPhoto] = useState("https://img.icons8.com/metro/26/000000/user-male.png")
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => { 
        setPhoto("https://img.icons8.com/metro/26/000000/user-male.png")
        user.user.profile && setPhoto(user.user.profile)
    }, [user])


    const loginResponse = (response) => {
        const user = { name: response.profileObj.name, email: response.profileObj.email, password: response.profileObj.googleId, profile: response.profileObj.imageUrl };
        const x = { name: response.profileObj.name, email: response.profileObj.email, profile: response.profileObj.imageUrl };
        dispatch(registerUser(user, x))
    }


    return (
        <div className={style.card}>
            <h3 className={style.name}>{user.user.name ? `Welcome ${user.user.name}` : "Log in to see your name"}</h3>
            <img className={style.image} width="30px" height="30px" src={photo} alt="user" />
            <GoogleLogin
                clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
                render={renderProps => (
                    <a onClick={user.user.name ? () => {dispatch(logoutUser())} : renderProps.onClick} disabled={renderProps.disabled} className={style.link} href="#!">{user.user.name ? 'Logout' : 'Login'}</a>
                )}
                buttonText="Login"
                onSuccess={loginResponse}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default User
