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
        <div className="box">
            <p>{user.username} currently logged in</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default LogoutButton
