// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import cognitoAuth from './cognito'

import AWSAppSyncClient from 'aws-appsync'
import VueApollo from 'vue-apollo'

console.log('Process args: ' + JSON.stringify(process.env))

const client = new AWSAppSyncClient({
  url: process.env.GRAPHQL_ENDPOINT,
  region: process.env.APP_SYNC_REGION,
  auth: {

    type: 'API_KEY',
    apiKey: process.env.APP_SYNC_API_KEY

    /* COGNITO USER POOLS
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: async () => (await Auth.currentSession()).getAcceessToken().getJwtToken()
    */
  }
}, {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
})

const appsyncProvider = new VueApollo({
  defaultClient: client
})

Vue.config.productionTip = false
Vue.use(VueApollo)

/* eslint-disable no-new */
new Vue({
  provide: appsyncProvider.provide(),
  el: '#app',
  router,
  cognitoAuth,
  // replace the content of <div id="app"></div> with App
  render: h => h(App)
})
