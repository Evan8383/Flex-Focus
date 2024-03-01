import decode from 'jwt-decode'

class AuthService {
  // Initializing important variables
  getUserAccount() {
    return decode(this.getToken())
  }

  loggedIn() {
    const token = this.getToken()
    return token ? true : false;
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken)
    // may change in the future
    window.location.assign('/app/dashboard')
  }

  logout() {
    localStorage.removeItem('id_token')
    // may change in the future
    window.location.assign('/')
  }
}

export default new AuthService();