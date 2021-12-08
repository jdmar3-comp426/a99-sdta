import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const RegisterForm = ({setNotif}) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const user = {
                username, name, password
            };
            const newUser = await axios.post('http://localhost:3001/app/users', user);
            setName('');
            setUsername('');
            setPassword('');
            setNotif(`User ${username} created successfully! Please log in!`);
            setTimeout(() => {
                setNotif(null);
            }, 5000);
            navigate('/login');
        } catch (error) {
            setNotif('An error occurred when registering, please try again');
            setTimeout(() => {
                setNotif(null);
            }, 5000);
        }
    }

    return (
        <div>
            <h3 class="title is-3">Register As A New User</h3>
            <div class="container is-max-desktop">
            <form onSubmit={handleRegister}>
                <div>
                    Name: <input class="input is-rounded" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    Username: <input class="input is-rounded" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                    Password: <input class="input is-rounded" placeholder="Password" value={password} type="password" onChange={(e)=>setPassword(e.target.value)} />
                    <div class="block">
                        <div class="columns is-centered">
                            <div class="column has-text-centered is-2">
                                <button class="button is-black is-outlined is-rounded" type="submit">Register new user</button>
                            </div>
                        </div>
                    </div>


                </div>
            </form>
            </div>

        </div>
    )
}

export default RegisterForm
