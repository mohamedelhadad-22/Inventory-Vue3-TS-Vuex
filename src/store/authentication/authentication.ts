import axios from 'axios'
export class Authentication {
  login_url: string
  logout_url: string
  base_url: string
  constructor() {
    this.login_url = 'api/profile/login/'
    this.logout_url = 'api/profile/logout/'
    this.base_url = process.env.VUE_APP_API_BASE_URL || 'http://192.168.100.36:8000/'
  }
  login(credentials: any) {
    console.log('base_url', this.base_url)
    console.log('login_url', this.login_url)
    const url = new URL(this.login_url, this.base_url).toString()

    const headers = {
      Accept: 'application/json, text/plain, */*'
    }
    return axios.post(url, credentials, { headers })
  }

  logout(token: string) {
    const url = new URL(this.logout_url, this.base_url).toString()
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + token
    }
    console.log('headers', headers)
    return axios.post(url, null, { headers })
  }
}
