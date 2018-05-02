<template>

  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="static/img-01.png" alt="IMG">
        </div>

        <form @submit.prevent="login" class="login100-form validate-form">
          <span class="login100-form-title"> Member Login</span>

          <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
            <input class="input100" type="text" name="email" placeholder="Email" v-model="username">
            <span class="focus-input100"></span>
            <span class="symbol-input100"><i class="fa fa-envelope" aria-hidden="true"></i></span>
          </div>

          <div class="wrap-input100 validate-input" data-validate="Password is required">
            <input class="input100" type="password" name="pass" placeholder="Password" v-model="pass">
            <span class="focus-input100"></span>
            <span class="symbol-input100"><i class="fa fa-lock" aria-hidden="true"></i></span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn">
              Login
            </button>
          </div>

          <div class="text-center p-t-12">
            <span class="txt1">Forgot</span>
            <router-link to="/reset_password">
              <a class="txt2" href="#">
                Username / Password?
              </a>
            </router-link>
          </div>

          <div class="text-center p-t-136">
            <a class="txt2" href="#">
              <router-link tag="li" to="/signup"><a>Create your Account</a></router-link>
              <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- OLD div class="col-sm-6 col-sm-offset-3">
      <h2>Log In</h2>
      <p v-if="$route.query.redirect">
          Log in to your account.
      </p>
      <div class="alert alert-danger" v-if="error">
          <p v-if="error" class="error">{{ error.message }}</p>
      </div>
      <form @submit.prevent="login">
          <div class="form-group">
              <input id="inputUsername" type="text" class="form-control" placeholder="Enter your username"
                     v-model="username" required>
          </div>
          <div class="form-group">
              <input id="inputPassword" type="password" class="form-control" placeholder="Enter your password"
                     v-model="pass" required>
          </div>
          <button class="btn btn-primary">login</button>
      </form>
      <div class="row marketing">
          <p>
              <router-link to="/signup">Create an account</router-link>
              or
              <router-link to="/reset_password">reset password</router-link>
              .
          </p>
      </div>
  </div-->
</template>

<script>
export default {
  data () {
    return {
      username: '',
      pass: '',
      error: null
    }
  },
  methods: {
    login () {
      this.$cognitoAuth.signin(this.username, this.pass, (err, result) => {
        if (err) {
          this.error = err
          console.error(err)
        } else {
          this.$router.replace(this.$route.query.redirect || '/dashboard')
        }
      })
    }
  }
}
</script>

<style>
  @import '../../static/main.css';
  @import '../../static/util.css';
  @import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
</style>

<!-- OLD style>
    .error {
        color: red;
    }
</style-->
