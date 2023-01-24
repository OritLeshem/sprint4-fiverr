import { useState, useEffect } from 'react'
import { userService } from '../../services/user.service'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        props.setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        console.log('credentials:', credentials)
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        props.onLogin(credentials)
        props.onCloseModal()
        clearState()
    }

    function onSignup(ev = null) {
        console.log('credentials:', credentials)
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        props.onSignup(credentials)
        props.onCloseModal()
        clearState()
    }

    function toggleSignup() {
        props.setIsSignup(!props.isSignup)
    }

    const { username, password } = credentials
    return <section className="login-signup">
        {!props.isSignup && <>
            <button className="close-modal-btn" onClick={() => props.onCloseModal()}>X</button>
            <h4>Join Finderr</h4>
        </>}
        {!props.isSignup && <form className="login-form" onSubmit={onLogin}>
            <input
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
            />
            <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <button>Continue</button>
        </form>}
        <div className="signup-section">
            {props.isSignup && <>
                <button className="close-modal-btn" onClick={() => props.onCloseModal()}>X</button>
                <h4>Sign In to Finderr</h4>
            </>}
            {props.isSignup && <form className="signup-form" onSubmit={onSignup}>
                <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Fullname"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button>Continue</button>
            </form>}
            <button className="btn-link" onClick={toggleSignup}>{props.isSignup ? 'Not a member yet? Join now' : 'Already a member? Sign In'}</button>
        </div>
    </section>
}