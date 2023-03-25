import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from '../context/user/userContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext)
  const { isAuthenticated, loading } = userContext
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading
          ? (
            <Redirect to='/login' />
            )
          : (
            <Component {...props} />
            )}
    />
  )
}

export default PrivateRoute
