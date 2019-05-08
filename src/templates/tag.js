import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import PostList from '../components/PostList/PostList'

const Tag = props => {
  const { data, pageContext } = props
  const { edges: posts } = data.allWordpressPost
  const { name } = pageContext

  return (
    <Layout>
      <PostList posts={posts} altTitle={name}/>
    </Layout>
  )
}

export default Tag

export const pageQuery = graphql`
  query TagPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(filter: { tags: { elemMatch: {slug: { eq: $slug }}}}) {
      totalCount
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`
