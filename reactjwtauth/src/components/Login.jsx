import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({username:'', password: ''});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(credentials, navigate);
        // Here you would typically send the credentials to your authentication service
    }
  return (
    <div className='row justify-content-center'>

        <div className='col-sm-6'>
            <div className='card p-4 mt-4'>
      <h1>Login form</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" className='form-control mb-3' placeholder="Username" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value}) } />

        <input type="password" className='form-control mb-3' placeholder="Password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value}) } />

        <button className='btn btn-dark' type="submit">Login</button>
      </form>
    </div>
    </div>

    </div>
    
  );
}

export default Login;