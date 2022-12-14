import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage(); 
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        message(error)
        clearError()
    },[error, message, clearError])

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})   
            message(data.message)
        } catch(e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch(e) {}
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Anything</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input className="yellow-input" value={form.email} id="email" type="text" name="email" onChange={(event) => changeHandler(event)}/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div>
                            <div className="input-field">
                                <input className="yellow-input" value={form.password} id="password" type="password" name="password" onChange={(event) => changeHandler(event)}/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={{marginRight: 10}} onClick={loginHandler} disabled={loading}>Log in</button>
                        <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}