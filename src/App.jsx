import './App.css'
import UserSignup from './Pages/UserSignup/UserSignup'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './Pages/UserLogin/UserLogin'
import UserProfile from './Pages/UserProfile/UserProfile'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserSignup />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default App
