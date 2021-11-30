import React from 'react'

const UserInfo = ({user}) => {

    if (!user) {
        return null;
    }

    return (
        <div className="box">
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <div className="box">
                <h3 className="title">User Activity History:</h3>
                {user.interactions.map(interaction =>
                <div className="box"> 
                    <p>Interaction Type: {interaction.interactionType}</p>
                    <p>Interaction Date: {interaction.interactionDate}</p>
                </div>
                    )}
            </div>
        </div>
    )
}

export default UserInfo
