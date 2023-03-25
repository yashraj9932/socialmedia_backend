import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/user/userContext'

const Login = (props) => {
  const userContext = useContext(UserContext)
  const { login, isAuthenticated } = userContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
  }, [isAuthenticated, props.history])

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const { email, password } = user

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
    } else {
      login({ email, password })
    }
  }
  return (
    <div className='row h-100'>
      <form
        className='col-md-4 my-auto'
        style={{ margin: '0 auto' }}
        onSubmit={onSubmit}
      >
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            className='form-control'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            className='form-control'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Sign In'
          className='btn btn-primary btn-block'
          style={{ margin: '10% auto' }}
        />
        <p className='text-center'>
          <Link to='/register'>Not A User? Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
