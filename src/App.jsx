import './App.css'
import UserSignup from './Pages/UserSignup/UserSignup'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './Pages/UserLogin/UserLogin'
import UserProfile from './Pages/UserProfile/UserProfile'
import { Provider } from 'react-redux'
import store from './Redux/store'
import AuthRoute from './Components/AuthRoute/AuthRoute'
import PageNotFound from './Pages/PageNotFound/PageNotFound'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/user-profile" element={<AuthRoute> <UserProfile /> </AuthRoute>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Provider>
  )
}

export default App
