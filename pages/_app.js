import { useState, createContext } from 'react'
import '../styles/globals.css'
import AppContext from 'components/AppContext'

export default function App({ Component, pageProps }) {
  const [lives, setLives] = useState(5);
  const [gameCompleted, setGameCompleted] = useState(false)
  return (
    <AppContext.Provider value={{lives, setLives, gameCompleted, setGameCompleted}}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
