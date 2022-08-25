import React, {useState} from 'react';
import './login.css'

const Login = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({user,password});
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