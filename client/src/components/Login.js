import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Login(props) {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            history.push('/');
            props.updateAlert('Logged In successfully', 'success');
        }
        else {
            props.updateAlert('Invalid credentials', 'danger');
        }
    }
    return (
        <>
            <div className="container my-3">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={onChange} className="form-control" id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login