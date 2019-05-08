import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import PostList from '../components/PostList/PostList'

const Category = props => {
  const { data, pageContext } = props
  const { edges: posts } = data.allWordpressPost
  const { name } = pageContext

  return (
    <Layout>
      <PostList posts={posts} altTitle={name}/>
    </Layout>
  )
}

export default Category

export const pageQuery = graphql`
  query CategoryPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(filter: { categories: { elemMatch: { slug: { eq: $slug }}}}) {
      totalCount
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`
