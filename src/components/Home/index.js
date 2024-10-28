import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const Home = () => {
  const jwtToken = Cookies.get('jwtToken')
  if (jwtToken === undefined) {
    <Redirect to="/login" />
  }
  return (
    <>
        
    </>
  )
}
export default Home
