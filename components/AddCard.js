import React, { useState } from 'react'
import style from '../styles/AddCard.module.css'
import { addPost } from '../actions/post'
import { useDispatch, useSelector } from 'react-redux'

const AddCard = ({setScreen}) => {
    // const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [location, setLocation] = useState("")
    const [image, setImage] = useState("https://via.placeholder.com/500x500.png?text=Upload+Image+Here")
    const [preview, setPreview] = useState("https://via.placeholder.com/500x500.png?text=Upload+Image+Here")
    const [caption, setCaption] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('post', image)
        formData.append('location', location)
        formData.append('caption', caption)
        dispatch(addPost(formData))
        setScreen("home")
    }
    
    const onUpload = (e) => {
        setImage(e.target.files[0]);
        setPreview(e.target.value)
        const file = e.target.files;
        if (file.length > 0) {
            var fileReader = new FileReader();
            fileReader.onload = (event) => {
                setPreview(event.target.result);
            };
            fileReader.readAsDataURL(file[0]);
        }
    }

    return (
        <div className={style.card}>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className={style.head}>
                    <img className={style.user} src={user.profile} height="50px" width="50px" alt="User" />
                    <div className={style.details}>
                        <h3>{user.name}</h3>
                        <input name="location" width="auto" className={style.locationInput} type="text" placeholder="Enter your location" value={location} onChange={(e) => {setLocation(e.target.value)}} required/>
                    </div>
                </div>
                {/* src={`data:image/png;base64,${Buffer.from(image).toString('base64')}`} */}
                <img className={style.image}  height="500px" width="500px" src={preview} alt="Image Uploaded" />
                <div className={style.footer}>
                        <textarea className={style.captionInput} type="text" placeholder="Enter your wonderful caption here for the world to see it" value={caption} onChange={(e) => {setCaption(e.target.value)}} required />
                </div>
                <label htmlFor="post" className={[style.button, style.addButton].join(" ")}>Upload Image</label>
                <input id="post" name="post" className={style.addButton} type="file" accept="image/*" onChange={onUpload} required />
                <button type="submit" className={[style.button, style.postButton].join(" ")}>Post Image</button>
            </form>
        </div>
    )
}

export default AddCard
