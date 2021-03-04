import { useState } from 'react'
import Header from '../components/Header'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store'

function MyApp({ Component, pageProps }) {
  const [screen, setScreen] = useState("home")
  return (
    <Provider store={store}>
      <Header screen={screen} setScreen={setScreen}/>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
