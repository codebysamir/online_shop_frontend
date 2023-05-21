import React, { useContext, useState } from 'react'
import { AuthContext } from '../utils/AuthContext'

export default function Register() {
  const [user, setUser] = useState({email: '', username: '', password: ''})
  const { registerUser, loginError, isSuccess } = useContext(AuthContext)


    function handleRegister() {
      console.log(user)
      registerUser(user)
      setUser({email: '', username: '', password: ''})
    }
      
  return (
    <div className='register-box'>
        {!isSuccess ?
        <div className="registerUser-box">
          <h2>REGISTER</h2>
          {loginError && <span className='loginError'>{loginError}</span>}
          <input type="email" placeholder='e-mail' value={user?.email} onChange={(e) => setUser({...user, email: e.target.value})} />
          <input type="text" placeholder='username' value={user?.username} onChange={(e) => setUser({...user, username: e.target.value})} />
          <input type="text" placeholder='password' value={user?.password} onChange={(e) => setUser({...user, password: e.target.value})} />
          <button className="register-btn" onClick={handleRegister} >REGISTER</button>
          <button className="forgotPassword-btn">I FORGOT MY PASSWORD</button>
          <button className="alreadyGotAccount-btn">I ALREADY GOT AN ACCOUNT</button>
        </div>
        :
        <div className="registerSuccess">
          <h2>Registration Successfull !</h2>
          <p>You will be send back to the previous Page, try to login with your new Account.</p>
        </div>}
    </div>
  )
}
