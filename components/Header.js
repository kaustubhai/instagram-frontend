import React from 'react'
import Home from '@material-ui/icons/Home';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import AddCircle from '@material-ui/icons/AddCircle';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutline';
import Face from '@material-ui/icons/FaceOutlined';
import Logout from '@material-ui/icons/ExitToAppOutlined';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import style from '../styles/Navbar.module.css'
import {registerUser, logoutUser} from '../actions/user'
import {getAllPosts, getLiked} from '../actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import cookie from 'js-cookie'
const Header = ({ screen, setScreen }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const loginResponse = (response) => {
        const user = { name: response.profileObj.name, email: response.profileObj.email, password: response.profileObj.googleId, profile: response.profileObj.imageUrl };
        dispatch(registerUser(user))
    }

    const onHome = () => {
        dispatch(getAllPosts())
        cookie.set('screen', 'home')
        setScreen("home")
    }
    const onLiked = () => {
        dispatch(getLiked())
        cookie.set('screen', 'liked')
        setScreen("liked")
    }
    const onAdd = () => {
        cookie.set('screen', 'add')
        setScreen("add")
    }
    const onLogout = () => {
        cookie.remove('screen')
        dispatch(logoutUser())
        setScreen("home")
    }

    if(!user.user.name)
        return (
            <div className={style.navbar}>
                <div className={style.content}>
                    <h1 className={style.title}>Instagram</h1>
                    <div>
                        <Home className={style.materialIcons}/>
                        <FavoriteBorder className={style.materialIcons, style.disabled} />
                        <AddCircleOutlined className={style.materialIcons, style.disabled}/>
                        <div id="googleLogin" className={style.gLogin}></div>
                        <GoogleLogin
                            clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
                            render={renderProps => (
                                <Face onClick={renderProps.onClick} disabled={renderProps.disabled} className={style.materialIcons}/>
                            )}
                            buttonText="Login"
                            onSuccess={loginResponse}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
            </div>
        )
    else {
        return (
            <div className={style.navbar}>
                <div className={style.content}>
                    <h1 className={style.title}>Instagram</h1>
                    <div>
                        {screen === 'home' ? <Home className={style.materialIcons} /> : <HomeOutlined onClick={onHome} className={style.materialIcons}/>}
                        {screen === 'liked' ? <Favorite className={style.materialIcons} /> : <FavoriteBorder onClick={onLiked} className={style.materialIcons} />}
                        {screen === 'add' ? <AddCircle className={style.materialIcons} /> : <AddCircleOutlined onClick={onAdd} className={style.materialIcons} />}
                        <Logout onClick={onLogout} className={style.materialIcons}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
