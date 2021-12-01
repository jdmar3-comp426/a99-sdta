import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const LogoutButton = ({setUser, user, setNotif}) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            window.localStorage.clear();
            const interaction = {
                interactionType: 'Logout',
                userId: user.id
            }
            const newUser = await axios.post('http://localhost:3001/app/interaction', interaction);
            console.log(newUser.data);
            setUser(null);
            setNotif('Successfully logged out');
            navigate('/');
        } catch (error) {
            setNotif('error when logging out');
            setTimeout(() => {
                setNotif(null);
            }, 5000);
        }
    }

    if (!user) {
        return null;
    }

    return (
        <div class="columns is-centered">
                    <div class="column has-text-centered is-4">
                    <h1 class="title">{user.username} currently logged in</h1>
            <button class="button is-black is-outlined is-rounded" onClick={handleLogout}>Logout</button>
                    </div>
                </div>

    )
}

export default LogoutButton
