import gql from 'graphql-tag'

export default gql`
  subscription onMessageAdded {
    newMessage {
        author
        text
    }
  }
`
