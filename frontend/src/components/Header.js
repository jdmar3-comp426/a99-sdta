import React from 'react'
import {Link} from 'react-router-dom'

const Header = ({user}) => {

    if (!user) {
        return (
        <div className="box">
            <Link to='/register' className="box">Register a new account!</Link>
            <Link to='/login' className="box">Login to your existing account!</Link>
          </div>  
        )
    } else {
        return (
            <div>
                <Link to='/dashboard' className="box">Dashboard</Link>
            </div>
        )    
    }

}

export default Header
