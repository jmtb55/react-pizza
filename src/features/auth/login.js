import React, { useState } from 'react';
import { login } from './state';
import './login.css'
import { useDispatch } from "react-redux";

const Login = () => {

    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login({user,password}))
    }

    return (
        <div className='login-screen'>
            <form onSubmit={handleSubmit}>
                <input placeholder='user' type='text' name='user' value={user} onChange={e => setUser(e.target.value)}/>
                <input placeholder='password' type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;