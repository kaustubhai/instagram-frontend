import React from 'react'
import style from '../styles/Card.module.css'
import FavouriteBorder from '@material-ui/icons/FavoriteBorder'
import Send from '@material-ui/icons/SendRounded'
import Bookmark from '@material-ui/icons/BookmarkRounded'

const Card = ({ username, userImage, userLocation, image, likes, caption }) => {
    return (
        <div className={style.card}>
            <div className={style.head}>
                <img className={style.user} src={userImage} height="50px" width="50px" alt="User" />
                <div className={style.details}>
                    <h3>{username}</h3>
                    <h5>{userLocation}</h5>
                </div>
            </div>
            <img className={style.image} src={`data:image/png;base64,${Buffer.from(image).toString('base64')}`} height="500px" width="500px" alt="Image" />
            <div className={style.footer}>
                <p>{caption}</p>
                <div className={style.actions}>
                    <div>
                        <FavouriteBorder className={style.materialIcons} />
                        <Send className={style.materialIcons}/>
                        <Bookmark className={style.materialIcons} />
                    </div>
                    <h3>{likes} likes so far...</h3>
                </div>
            </div>
        </div>
    )
}

export default Card
