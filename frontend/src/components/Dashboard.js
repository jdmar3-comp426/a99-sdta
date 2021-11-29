import React from 'react'

const Dashboard = ({user}) => {

    if (!user) {
        <div>You must be logged in to view the dashboard!</div>
    }

    return (
        <div>
            Main Application
        </div>
    )
}

export default Dashboard
