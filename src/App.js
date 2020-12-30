import React, { useContext }  from 'react'
import { UserContext }        from './context/UserContext'
import AppLoading             from "./components/OtherPages/AppLoading"
import Router                 from "./Router"
import AuthRouter             from "./AuthRouter"
import "./app.css"

function App() {
  const { user, isLoad } = useContext(UserContext)
  return (
    <div>
      { isLoad ? (user ? <Router /> : <AuthRouter />) : <AppLoading />}
    </div>
  )
}
export default App