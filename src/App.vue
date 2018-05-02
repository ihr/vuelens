<template>
  <div id="app" class="container" v-if="hydrated">
    <div class="header clearfix navbar">
      <nav>
        <ul class="nav nav-pills pull-right">
          <router-link tag="li" to="/" exact><a>Home</a></router-link>
          <router-link tag="li" v-if="loggedIn" to="/dashboard"><a>Dashboard</a></router-link>
          <router-link tag="li" v-if="loggedIn" to="/change_password"><a>Change Password</a></router-link>
          <router-link tag="li" v-if="loggedIn" to="/logout"><a>Log out</a></router-link>
          <router-link tag="li" v-if="!loggedIn" to="/login"><a>Log in</a></router-link>
          <router-link tag="li" v-if="!loggedIn" to="/signup"><a>Sign Up</a></router-link>
        </ul>
      </nav>
    </div>
    <div class="container">
      <template>
        <router-view :loggedIn="loggedIn"></router-view>
      </template>
    </div>
    <footer class="footer">
      <p>© 2018 Swisscom AG (Schweiz)</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      loggedIn: false,
      hydrated: false
    }
  },
  async mounted () {
    await this.$apollo.provider.defaultClient.hydrated()
    this.hydrated = true
  },
  created () {
    this.$cognitoAuth.isAuthenticated((err, loggedIn) => {
      if (err) {
        console.err("App: Couldn't get the session:", err, err.stack)
        return
      }
      this.loggedIn = loggedIn
    })
    this.$cognitoAuth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  }
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';

  .navbar {
    width: 100%;
    margin-left: auto ;
    margin-right: auto ;
  }
  .navbar ul {
    list-style-type: none; /*to remove bullets*/
    text-align: center;
    padding: 0px;
    zoom:1;
    overflow: hidden;
  }
  .navbar li{
    padding: 2px;
    width: 150px;
    display:inline-block;
  }

</style>
