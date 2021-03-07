import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../actions/post'
import { getUser } from '../actions/user'
import Card from '../components/Card'
import User from '../components/User'
import styles from '../styles/Home.module.css'
import cookie from 'js-cookie'
import AddCard from '../components/AddCard'

export default function Home({ screen, setScreen }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPosts())
    if (cookie.get('token'))
      dispatch(getUser())
  }, [])
  const postsState = useSelector(state => state.posts)
  const { posts, loading } = postsState
  
  // Screen can be home, liked, upload
  return (
    <div className={styles.container}>
      <Head>
        <title>Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <User/>
      <main className={styles.main}>
        {
          screen === "home" && posts.length > 0 && posts.slice(0).reverse().map((post) => (
            <Card key={post._id} id={post._id} username={post.owner.name} userLocation={post.location} userImage={post.owner.profile} image={post.image.data} likes={post.likes} caption={post.caption}/>
          )) 
        }
        {
          screen === "liked" && posts.length > 0 && posts.slice(0).reverse().map((post) => (
            <Card key={post.image.data} username={post.owner.name} userLocation={post.location} userImage={post.owner.profile} image={post.image.data} likes={post.likes} caption={post.caption}/>
          )) 
        }
        {
          screen === "add" && 
          <AddCard setScreen={setScreen}/>
        }
      </main>
    </div>
  )
}
