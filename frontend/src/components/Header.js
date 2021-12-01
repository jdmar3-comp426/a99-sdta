import React from 'react'
import {Link} from 'react-router-dom'

const Header = ({user}) => {

    if (!user) {
        return (

        <div class="columns is-centered">
            <div class="column has-text-centered is-2">
                <Link to='/register' class="button is-black is-outlined is-rounded">Register a new account!</Link>
            </div>
            <div class="column has-text-centered is-2">
                <Link to='/login' class="button is-black is-outlined is-rounded">Login to your existing account!</Link>
            </div>
        </div>
        )
    } else {
        return (
            <div class="block">
                <div class="columns is-centered">
                <Link to='/dashboard' className="button is-rounded is-black">Go to dashboard</Link>
            </div>
            </div>

        )
    }

}

export default Header
