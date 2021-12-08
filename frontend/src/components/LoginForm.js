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
            <h3 class="title is-3">Login To Existing User</h3>
            <div class="container is-max-desktop">
                <form onSubmit={handleLogin}>
                Username: <input class="input is-rounded" placeholder="Username" typevalue={username} onChange={(e)=>setUsername(e.target.value)} />
                Password: <input class="input is-rounded" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <div class="block">
                <div class="columns is-centered">
                    <div class="column has-text-centered is-2">
                        <button class="button is-black is-outlined is-rounded" type="submit">Login</button>
                    </div>
                </div>
                </div>
            </form>
            </div>

        </div>
    )
}

export default LoginForm
