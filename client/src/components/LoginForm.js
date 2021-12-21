import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({handleSubmit}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
            username
          <input
            id="username"
            name="username"
          />
        </div>
        <div>
            password
          <input
            id="password"
            type="password"
            name="password"
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm
