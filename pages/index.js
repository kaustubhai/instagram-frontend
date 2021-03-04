import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../actions/post'
import Card from '../components/Card'
import User from '../components/User'
import styles from '../styles/Home.module.css'

export default function Home() {
  const dispatch = useDispatch()
  const [screen, setScreen] = useState("home")
  useEffect(() => {
    dispatch(getAllPosts())
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
          screen === "home" && posts.length > 0 && posts.map((post) => (
            <Card key={post.image.data} username={post.owner.name} userLocation={post.location} userImage={post.owner.profile} image={post.image.data} likes={post.likes} caption={post.caption}/>
          )) 
        }
      </main>
    </div>
  )
}
