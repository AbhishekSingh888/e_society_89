import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Signup(props) {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', username: '' });
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, username: credentials.username })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            history.push('/');
            props.updateAlert('Account created', 'success');
        }
        else {
            props.updateAlert('Invalid credentials', 'danger');
        }
    };
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };



    return (
        <>
            <div className="container my-3">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" onChange={onChange} className="form-control" id="name" name="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" onChange={onChange} className="form-control" id="username" name="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={onChange} className="form-control" id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default Signup