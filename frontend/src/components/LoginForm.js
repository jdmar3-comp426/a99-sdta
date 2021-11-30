import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const LoginForm = ({user, setUser, setNotif}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    if (user) {
        return (
            <div>Already logged in!</div>
        )
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            e.preventDefault();
            const attemptedUser = {
                username,
                password
            }
            const loggedUser = await axios.post('http://localhost:3001/app/login', attemptedUser);
            const logInteraction = {
                interactionType: 'Login',
                userId: loggedUser.data.id
            }
            const newUser = await axios.post('http://localhost:3001/app/interaction', logInteraction);
            setUser(newUser.data);
            window.localStorage.setItem('loggedUser', JSON.stringify(newUser.data));
            setNotif(`${username} successfully logged in!`);
            setTimeout(() => {
                setNotif(null);
            }, 5000);
            setUsername('');
            setPassword('');
            navigate('/dashboard')
        } catch (error) {
            setNotif('error: Invalid credentials');
            setTimeout(() => {
                setNotif(null);
            }, 5000);
        }
    }

    return (
        <div>
            Login To Existing User
            <form onSubmit={handleLogin}>
                Username: <input value={username} onChange={(e)=>setUsername(e.target.value)} />
                Password: <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm
