import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import Header from './components/Header'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import DashBoard from './components/Dashboard'
import UserInfo from './components/UserInfo'

const App = () => {
  const [user, setUser] = useState(null);
  const [notif, setNotif] = useState(null);

  useEffect(()=> {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const existingUser = JSON.parse(loggedUser);
      setUser(existingUser);
    }
  }, [])

  console.log('user', user)

  return (
    <div>
      <Router>
          <h1 class="block title is-1">Cryptocurrency Dashboard</h1>
        <Notification message={notif} />
        <Header user={user} />
        <Routes>
          <Route path='/register' element={<RegisterForm setNotif={setNotif} />} />
          <Route path='/login' element={<LoginForm setNotif={setNotif} user={user} setUser={setUser} />} />
          <Route path='/userinfo' element={<UserInfo user={user} setUser={setUser} setNotif={setNotif} />} />
          <Route path="/dashboard" element={<DashBoard user={user} />} />
        </Routes>
        <LogoutButton user={user} setUser={setUser} setNotif={setNotif} />
        {user &&
        <div class="columns is-centered">
        <div class="column has-text-centered is-4">
        <Link to='/userinfo' class="button is-black is-outlined is-rounded">My User Info</Link>

        </div>
    </div>
        }
      </Router>
    </div>
  )
}
export default App;
