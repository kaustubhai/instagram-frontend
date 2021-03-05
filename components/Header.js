import React from 'react'
import Home from '@material-ui/icons/Home';
import AddCircle from '@material-ui/icons/AddCircleOutline';
import Face from '@material-ui/icons/FaceOutlined';
import Logout from '@material-ui/icons/ExitToAppOutlined';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import style from '../styles/Navbar.module.css'
import {registerUser, logoutUser} from '../actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const loginResponse = (response) => {
        const user = { name: response.profileObj.name, email: response.profileObj.email, password: response.profileObj.googleId, profile: response.profileObj.imageUrl };
        dispatch(registerUser(user))
    }
    if(!user.user.name)
        return (
            <div className={style.navbar}>
                <div className={style.content}>
                    <h1 className={style.title}>Instagram</h1>
                    <div>
                        <Home className={style.materialIcons}/>
                        <FavoriteBorder className={style.materialIcons} />
                        <AddCircle className={style.materialIcons}/>
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
                        <Home className={style.materialIcons}/>
                        <FavoriteBorder className={style.materialIcons} />
                        <AddCircle className={style.materialIcons}/>
                        <div id="googleLogin" className={style.gLogin}></div>
                        <Logout onClick={() => {dispatch(logoutUser())}} className={style.materialIcons}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
