import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts, getLiked } from '../actions/post'
import { getUser } from '../actions/user'
import Card from '../components/Card'
import User from '../components/User'
import styles from '../styles/Home.module.css'
import cookie from 'js-cookie'
import AddCard from '../components/AddCard'
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home({ screen, setScreen }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPosts())
    if (cookie.get('token'))
      dispatch(getUser())
    if (cookie.get('screen') === 'liked') {
      dispatch(getLiked())
      setScreen('liked')
    }
  }, [])
  const postsState = useSelector(state => state.posts)
  const userState = useSelector(state => state.user)
  const { posts } = postsState
  
  // Screen can be home, liked, upload
  return (
    <div className={styles.container}>
      <Head>
        <title>Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer/>
      <User setScreen={setScreen}/>
      <main className={styles.main}>
      {
        screen === "home" && posts.length > 0 && posts.slice(0).reverse().map((post) => (
          <LoadingOverlay key={post._id} active={userState.loading || postsState.loading} spinner ><Card id={post._id} username={post.owner.name} userLocation={post.location} userImage={post.owner.profile} image={post.image.data} likes={post.likes} caption={post.caption}/></LoadingOverlay>
        )) 
      }
      {
        screen === "liked" && posts.length > 0 && posts.slice(0).reverse().map((post) => (
          <LoadingOverlay key={post._id} active={userState.loading || postsState.loading} spinner ><Card username={post.owner.name} userLocation={post.location} userImage={post.owner.profile} image={post.image.data} likes={post.likes} caption={post.caption}/></LoadingOverlay>
        )) 
      }
      {
        screen === "add" && 
        <LoadingOverlay style={{zIndex: -1}} active={userState.loading || postsState.loading} spinner ><AddCard setScreen={setScreen}/></LoadingOverlay>
      }       
      </main>
    </div>
  )
}