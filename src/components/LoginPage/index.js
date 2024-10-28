import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory() // Use history for navigation

  const onSuccessView = jwtToken => {
    if (jwtToken) {
      Cookies.set('jwtToken', jwtToken)
      history.replace('/')
    }
  }

  const onChangeEvent = event => {
    const {type, value} = event.target
    if (type === 'text') {
      setUsername(value)
    } else if (type === 'password') {
      setPassword(value)
    }
  }

  const onSubmitForm = async event => {
    event.preventDefault() // Prevent default form submission
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json() // Await response json
      const jwtToken = data.jwt_token
      console.log(jwtToken)
      if (response.ok) {
        onSuccessView(jwtToken) // Redirect on success
      } else {
        console.error(data.error_msg) // Handle error case
        // Optionally, you could set an error state here to inform the user
        setErrorMsg(data.error_msg)
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorMsg('Invalid username or password') // Handle fetch error
    }
  }

  return (
    <>
      <div className="main-container">
        <div className="image-container">
          <img
            src="https://s3-alpha-sig.figma.com/img/3056/c7bb/e7efb0d3d71dcb5062f1e077527d7f5d?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z60IF~nhvoxQ4PZQcBZiEN6ZUScQ3Un4knVKVX1UONvm0Z-bADwODu9oTGc-IRzLAQZENe5ErCcTHon0WgayvQaw~saTLBQ-tO8XX85UBS~4kow7XLL2kdKhaUJyqlNCOWw9pMMcfdBIIeoDM4~EGKLaTEK4R8w9~pxcTE3LjzfLcm-mWKo26~UVGaIwfWsgT9xFUFhqpUjcJ1LdGkFCWkKlZbDEoDZAUw099~D6ihRAWlD1A9HXbbc0PlwzAlz4R5iWY0j0D6gICE2HxkptG0wNnBq5~HumFwfM48YHK8Vt1npyDFr9W3zVQ2MawbPyK~OK~70brL9KaKxyo1VTIQ__"
            alt="login"
            className="login-image"
          />
        </div>
        <div className="form-container">
          <form onSubmit={onSubmitForm}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={onChangeEvent}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={onChangeEvent}
              />
            </div>
            {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
            <div className="button-container">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
