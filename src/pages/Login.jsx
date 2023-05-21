import React, { useContext, useState } from 'react'
import { AuthContext } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

export default function Login() {
  const [user, setUser] = useState({username: '', password: ''})
  const { loginUser, loginError } = useContext(AuthContext)

    function handleLogin() {
      console.log(user)
      loginUser(user)
      setUser({username: '', password: ''})
    }
      
  return (
    <div className='login-box'>
        <div className="signIn-box">
            <h2>SIGN IN</h2>
            {loginError && <span className='loginError'>{loginError}</span>}
            <input type="text" placeholder='username' value={user?.username} onChange={(e) => setUser({...user, username: e.target.value})} />
            <input type="text" placeholder='password' value={user?.password} onChange={(e) => setUser({...user, password: e.target.value})} />
            <button className="login-btn" onClick={handleLogin} >LOGIN</button>
            <Link>
              <button className="forgotPassword-btn">I FORGOT MY PASSWORD</button>
            </Link>
            <Link to={'/register'}>
              <button className="createAccount-btn">CREATE A NEW ACCOUNT</button>
            </Link>
        </div>
    </div>
  )
}
