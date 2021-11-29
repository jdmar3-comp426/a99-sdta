import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import Header from './components/Header'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import DashBoard from './components/Dashboard'

const App = () => {
  const [user, setUser] = useState(null);
  const [notif, setNotif] = useState(null);

  useEffect(()=> {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const existingUser = JSON.parse(loggedUser);
      setUser(existingUser.data);
    }
  }, [])

  console.log('user', user)

  return (
    <div>
      <Router>
        <h1 className="title">426 Project</h1>
        <Notification message={notif} />
        <Header user={user} />
        <Routes>
          <Route path='/register' element={<RegisterForm setNotif={setNotif} />} />
          <Route path='/login' element={<LoginForm setNotif={setNotif} user={user} setUser={setUser} />} />
          <Route path="/dashboard" element={<DashBoard user={user} />} />
        </Routes>
        <LogoutButton user={user} setUser={setUser} setNotif={setNotif} />
      </Router>
    </div>
  )
}
export default App;
