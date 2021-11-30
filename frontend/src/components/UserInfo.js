import React, {useState} from 'react'
import axios from 'axios'

const UserInfo = ({user, setUser, setNotif}) => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    if (!user) {
        return null;
    }

    const handleUserUpdate = async (e) => {
        try {
            // e.preventDefault();
            const newUserInfo = {
                username: newUsername,
                password: newPassword
            };
            const newUser = await axios.put(`http://localhost:3001/app/users/${user.id}`, newUserInfo);
            setUser(newUser.data);
            console.log(newUser.data);
            setNotif('Successfully changed user info');
            setTimeout(() => {
                setNotif(null);
            }, 5000);
            setNewUsername('');
            setNewPassword('');
        } catch (error) {
            setNotif('error in changing user details');
            setTimeout(() => {
                setNotif(null);
            }, 5000);
        }
    }

    return (
        <div className="box">
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <div className="box">
                <h3 className="title">User Activity History:</h3>
                {user.interactions.map(interaction =>
                <div className="box" key={interaction.interactionDate}> 
                    <p>Interaction Type: {interaction.interactionType}</p>
                    <p>Interaction Date: {interaction.interactionDate}</p>
                </div>
                    )}
            <form onSubmit={handleUserUpdate} className="box">
                <h4 className="title">Edit User Info</h4>
                New Username: <input value={newUsername} onChange={(e)=>setNewUsername(e.target.value)} />
                New Password: <input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                <button type="submit">Edit My User Info</button>
            </form>
            </div>
        </div>
    )
}

export default UserInfo
