<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <span class="login100-form-title">Draw a digit in the square below</span>

        <div class="login100-pic js-tilt" data-tilt style="margin: auto">
          <div style="margin-left: auto; margin-right: auto; border: solid 2px #666; width: 143px; height: 144px;">
            <canvas width="140" height="140" v-on:mousemove="mouse_move" ref="drawing_canvas"></canvas>
          </div>
        </div>

        <div class="container-login100-form-btn">
          <button v-on:click="send_value" class="login100-form-btn">Send</button>
        </div>

        <div class="container-login100-form-btn">
          <button v-on:click="clear_value" class="login100-form-btn">Clear</button>
        </div>

      </div>
    </div>
  </div>

  <!-- div class="hello">
    <div style="margin: 0 auto; border: solid 2px #666; width: 143px; height: 144px;">
      <canvas width="140" height="140" v-on:mousemove="mouse_move" ref="drawing_canvas"></canvas>
      <button v-on:click="send_value" class="login100-form-btn">Send</button>
      <button v-on:click="clear_value" class="login100-form-btn">Clear</button>
      <div class="row marketing">
        <h2>Prediction</h2>
        <p> !!! {{ timestamp }} !!!</p>
      </div>

    </div>

  </div -->
</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import MSG_SUBSCRIPTION from '../graphql/newMessage.js'

export default {
  name: 'HelloWorld',
  apollo: {
    // Subscriptions
    $subscribe: {
      // When a tag is added
      newMessage: {
        query: MSG_SUBSCRIPTION,
        // Reactive variables
        variables () {
          // This works just like regular queries
          // and will re-subscribe with the right variables
          // each time the values change
          return {
            type: this.type
          }
        },
        // Result hook
        result (data) {
          console.log(data)
        }
      }
    }

  },
  data () {
    return {
      click: 0,
      pixels: [],
      image_matrix_str: '',
      token: 'Loading token..',
      jwtToken: '',
      user: {},
      timestamp: ''
    }
  },
  created () {
    this.$cognitoAuth.getIdToken((err, jwtToken) => {
      if (err) {
        console.log("Dashboard: Couldn't get the session:", err, err.stack)
        return
      }
      console.log('JWT Token:' + jwtToken)
      this.jwtToken = jwtToken
      this.token = jwtDecode(jwtToken)
      this.user = this.$cognitoAuth.getCurrentUser()
    })
  },
  // define methods under the `methods` object
  methods: {

    mouse_move: function (event) {
      if (this.pixels.length === 0) {
        this.pixels = []
        for (let i = 0; i < 28 * 28; i++) { this.pixels[i] = 0 }
      }

      if (event.buttons === 1) {
        this.click = 1
        this.$refs.drawing_canvas.getContext('2d').fillStyle = 'rgb(0,0,0)'
        this.$refs.drawing_canvas.getContext('2d').fillRect(event.offsetX, event.offsetY, 8, 8)
        let x = Math.floor(event.offsetY * 0.2)
        let y = Math.floor(event.offsetX * 0.2) + 1
        for (let dy = 0; dy < 2; dy++) {
          for (let dx = 0; dx < 2; dx++) {
            if ((x + dx < 28) && (y + dy < 28)) {
              this.pixels[(y + dy) + (x + dx) * 28] = 1
            }
          }
        }
      } else {
        if (this.click === 1) this.set_value()
        this.click = 0
      }
    },

    set_value: function () {
      let result = '[['
      for (let i = 0; i < 28; i++) {
        result += '['
        for (let j = 0; j < 28; j++) {
          result += this.pixels[i * 28 + j]
          if (j < 27) {
            result += ', '
          }
        }
        result += ']'
        if (i < 27) {
          result += ', '
        }
      }
      result += ']]'
      this.image_matrix_str = result
      console.log('data = ' + result)
    },

    send_value: function () {
      if (this.pixels.length > 0) {
        axios.defaults.headers.common['Authorization'] = this.jwtToken
        axios.defaults.headers.common['Accept'] = 'application/json'
        axios.defaults.headers.common['Content-Type'] = 'application/json'

        axios.post(
          'https://8fr0c2zryl.execute-api.eu-central-1.amazonaws.com/beta/digit',
          this.image_matrix_str
        )
          .then(function (response) {
            console.log('Response: ' + response)
          })
          .catch(function (error) {
            console.log('Error: ' + error)
          })
      }
    },

    clear_value: function (event) {
      this.$refs.drawing_canvas.getContext('2d').fillStyle = 'rgb(255,255,255)'
      this.$refs.drawing_canvas.getContext('2d').fillRect(0, 0, 140, 140)
      for (var i = 0; i < 28 * 28; i++) {
        this.pixels[i] = 0
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../static/main.css';
  @import '../../static/util.css';

  .hello {
    text-align: center;
  }
</style>
