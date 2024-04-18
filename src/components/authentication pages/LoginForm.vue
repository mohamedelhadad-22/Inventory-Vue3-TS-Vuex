<template>
  <div class="login-pagin">
    <div class="club-infologin">
      <div class="login_info">
        <p class="step-subtext">
          Few things make me feel more powerful than setting up automations in Dara to make my life
          easier and more efficient.
        </p>
        <h5>Fulan ALFulani—</h5>
        <span>Founder</span>
      </div>
    </div>
    <div class="formdiv">
      <div class="data_container">
        <div class="welcome_MSG">
          <DarahTextLogo />
          <h3>Log in to your account</h3>
          <p>Welcome back! Please enter your details.</p>
        </div>
        <transition name="fade" mode="out-in">
          <form @submit.prevent class="login_email_form">
            <div class="form-control">
              <label for="username">Email Address</label>
              <input
                type="text"
                id="username"
                placeholder="Example@email.com"
                v-model="state.email"
              />
              <span class="error-feedback" v-if="v$.email.$error">
                {{ v$.email.$errors[0].$message }}
              </span>
            </div>
          </form>
        </transition>

        <Transition name="fade" mode="out-in">
          <form @submit.prevent class="password_login">
            <div class="form-control">
              <label for="username">Email Address</label>
              <input
                type="password"
                id="Password"
                placeholder="Password"
                v-model="state.password"
              />
              <span class="error-feedback" v-if="v$.password.$error">
                {{ v$.password.$errors[0].$message }}
              </span>
            </div>
            <!-- <div class="form-control">
              <label for="username">Password</label>
              <input
                type="password"
                id="Password"
                placeholder="Password"
                v-model="state.password"
              />
              <span class="error-feedback" v-if="v$.password.$error">
                {{ v$.password.$errors[0].$message }}
              </span>
            </div> -->
            <div class="form-remember">
              <div class="checkbox">
                <input type="checkbox" name="rememberme" id="rememberme" />
                <label for="rememberme">Remember me.</label>
              </div>
              <div class="forgetpassowrd">
                <router-link to="/forgotpassword">Forgot password?</router-link>
              </div>
            </div>
          </form>
        </Transition>

        <div class="form-control action_button">
          <button @click="newLogin" class="login-btn">Log in</button>
          <button class="with_password">Login with password</button>

          <button class="with_google">Log in with Google <GoogleIcon /></button>
        </div>
        <p class="invalidpass">{{ errorMessage }}</p>

        <div class="signup">
          <p class="to-signup">Don't have an account? <a href="#">Sign up.</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import axios from "axios"
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import DarahTextLogo from '@/assets/icons/DarahTextLogo.vue'
import GoogleIcon from '@/assets/icons/GoogleIcon.vue'
import { Authentication } from '@/store/authentication/authentication'
import logo from '@/assets/logo.png'
export default {
  name: 'LoginForm',
  components: {
    DarahTextLogo,
    GoogleIcon
  },
  data() {
    return {
      errorMessage: '' as string,
      store: useStore(),
      logo
    }
  },
  setup() {
    // create state data
    const state = reactive({
      email: '',
      password: ''
    })
    // create validation rules
    const rules = computed(() => {
      return {
        email: { required, email },
        password: { required }
      }
    })
    const v$ = useVuelidate(rules, state)
    return {
      state,
      v$ // expose validation results
    }
  },
  methods: {
    async newLogin() {
      // Validate user input
      this.validateUser()
      if (this.v$.$error) {
        console.log('Validation failed')
        return // Stop execution if validation fails
      }

      try {
        const credentials = {
          email: this.state.email,
          password: this.state.password
        }

        const auth = new Authentication()
        const res = await auth.login(credentials)

        // Assuming the API returns a token upon successful login
        if (res.data.token) {
          localStorage.setItem('token', res.data.token)
          this.$router.push('/') // Redirect to home page on successful login
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.'
        }
      } catch (error) {
        console.log(error)
        this.errorMessage = 'An error occurred during login. Please try again.'
      }
    },
    // check if user data valid
    validateUser() {
      this.v$.$validate()
      if (!this.v$.$error) {
        console.log('user data is valid')
      } else {
        console.log('user data is invalid')
      }
    },
    userLoginCheck() {
      if (localStorage.getItem('token')) {
        // save token to local storage
        //
        // localStorage.setItem('email', JSON.stringify(res.data.email))

        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    }
  },
  mounted() {
    this.userLoginCheck()
  }
}
</script>

<style scoped>
.login {
  width: 100%;
}
.login-pagin {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.data_container {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
}
.login_email_form,
.password_login {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
}
.welcome_MSG {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
}
.welcome_MSG img {
  max-width: 164px;
  max-height: 54px;
  margin-bottom: 24px;
}
.welcome_MSG h3 {
  color: var(--Base-Dark);
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 12px;
}
.welcome_MSG p {
  display: flex;
  width: 80%;
  color: #667085;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
}
.welcome_MSG svg {
  margin-bottom: 40px;
}
.login-pagin .formdiv {
  width: 45%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
}
.clublogo img {
  width: 40%;
}
.login-pagin .login_email_form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: right;
}
.form-control {
  width: 100%;
}
.login-pagin .login_email_form h3 {
  color: #5757bc;
  text-align: left;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 100%;
  margin-bottom: 10px;
}
.login-pagin .login_email_form .step-subtext {
  color: #777;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 40px;
}
.form-control label {
  display: block;
  padding-bottom: 8px;
  color: #777;
  font-size: 16px;
  font-weight: 500;
}

.form-control input {
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #e9e9e9;
  outline: none;
}
.form-control input::placeholder {
  color: #cdd1d7;
  font-size: 16px;
  font-weight: 400;
}
.action_button {
  margin-top: 24px;
  width: 100%;
}
.with_password {
  color: #5757bc;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  width: 100%;
  text-align: center;
  margin-top: 22px;
}
.with_google {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  width: 100%;
  border-radius: 4px;
  margin-top: 16px;
  min-height: 52px;
  border: 1px solid #d0d5dd;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: #344054;
  font-size: 16px;
  font-weight: 600;
}
.with_google svg {
  margin-right: 10px;
}
.form-remember {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;
  padding-top: 10px;
}
.form-remember label {
  color: #777;
  font-size: 16px;
  font-weight: 400;
}
.form-remember .checkbox {
  display: flex;
  align-items: center;
}
.form-remember .checkbox input {
  fill: #fff;
  stroke-width: 1px;
  stroke: #777;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  margin-left: 6px;
}
.form-remember .forgetpassowrd a {
  color: #5757bc;
  font-size: 16px;
  font-weight: 400;
  text-decoration-line: underline;
}
.action_button .login-btn {
  width: 100%;
  padding: 12px 18px;
  border: none;
  outline: none;
  border-radius: 4px;
  border-radius: 4px;
  border: 1px solid #5757bc;
  background: #5757bc;
  color: #fff;
  cursor: pointer;
  gap: 6px;
  transition: all 0.4s ease-in-out;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
.form-control .login-btn:hover {
  background: #5757bc;
}
.signup {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.signup .to-signup {
  color: #777;
  font-size: 18px;
  font-weight: 400;
}
.signup .to-signup a {
  color: #5757bc;
  font-size: 18px;
  font-weight: 400;
  text-decoration-line: underline;
}
.club-infologin {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  align-content: stretch;
  height: 100%;
  width: 55%;
  padding: 80px 60px 80px 80px;
  background-image: url('../../assets/Darah-loginbg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  min-height: 100vh;
  gap: 96px;
  position: relative;
}
.club-infologin::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.login_info {
  text-align: left;
  z-index: 2;
}
.login_info p {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #fcfcfd;
}
.login_info h5 {
  font-size: 18px;
  font-weight: 600;
  color: #fcfcfd;
}
.login_info span {
  font-size: 16px;
  font-weight: 500;
  color: #eaecf0;
}
.loginfooter {
  display: flex;
  align-items: flex-end;
}
.invalidpass,
.error-feedback {
  transition: all 0.4s ease-in-out;
  color: crimson;
  width: 100%;
  display: block;
  text-align: left;
  padding: 8px 0px 0px 10px;
  font-size: 14px;
}

.invalidpass {
  font-size: 14px;
  margin-top: 10px;
  width: 100%;
  /* padding: 10px; */
  /* background-color: rgba(220, 20, 60, 0.205); */
  border-radius: 4px;
}
</style>
