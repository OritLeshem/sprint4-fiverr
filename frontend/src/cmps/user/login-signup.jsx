import { useState, useEffect } from 'react'
import { userService } from '../../services/user.service'
import { ImgUploader } from '../img-uploader'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
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
        setIsSignup(false)
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
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    const { username, password } = credentials
    return <section className="login-signup">
        {!isSignup && <h4>Join Filterr</h4> &&
            <button className="close-modal-btn" onClick={() => props.onCloseModal()}>X</button>}
        {!isSignup && <form className="login-form" onSubmit={onLogin}>
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
            {isSignup && <h4>Sign In to Filterr</h4> &&
                <button className="close-modal-btn" onClick={() => props.onCloseModal()}>X</button>}
            {isSignup && <form className="signup-form" onSubmit={onSignup}>
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
            <button className="btn-link" onClick={toggleSignup}>{isSignup ? 'Not a member yet? Join now' : 'Already a member? Sign In'}</button>
        </div>
    </section>
}