import React, { useState, useEffect } from 'react';
import { login } from './state';
import './login.css'
import { useDispatch, useSelector } from "react-redux";

const Login = () => {

    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login({user,password}))
    }

    useEffect(()=>{
        if (authState.error) alert(authState.error);
    }, [authState])

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