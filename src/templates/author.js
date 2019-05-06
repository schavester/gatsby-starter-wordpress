import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const Author = props => {
  const { data } = props
  console.log(data)

  return (
    <Layout/>
  )
}

export default Author

export const pageQuery = graphql`
  query AuthorPage($id: String!) {
    wordpressWpUsers(id: { eq: $id }) {
      name
      authored_wordpress__POST {
        ...PostListFields
      }
    }
  }
`
