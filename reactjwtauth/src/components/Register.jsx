import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [credentials, setCredentials] = useState({username:'', email:'', password: ''});
    const { register, errors } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        register(credentials, navigate);
        // Here you would typically send the credentials to your authentication service
    }

    const renderError = (field) => {
        if (errors && errors[field]) {
            const message = Array.isArray(errors[field]) ? errors[field] : errors[field];
            return message.map((msg, index) => <p key={index} className='error text-danger'><small>{msg}</small></p> )
        }
        return null;
    }    



  return (
    <div className='row justify-content-center'>

        <div className='col-sm-6'>
            <div className='card p-4 mt-4'>
      <h1>Register form</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" className='form-control mb-3' placeholder="Username" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value}) } />
        {renderError('username')}

        <input type="email" className='form-control mb-3' placeholder="email" value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value}) } />

        <input type="password" className='form-control mb-3' placeholder="Password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value}) } />
        {renderError('password')}

        <button className='btn btn-dark' type="submit">Register</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Register;