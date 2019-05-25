import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import { PostHeader } from '../components/Headers/PostHeader/PostHeader';
import Disqus from '../components/Disqus/Disqus'

export const BlogPostTemplate = ({
  postNode
}) => (
  <div className="content">
    {
      <PostHeader 
        id={postNode.id}
        content={postNode.content}
        categories={postNode.categories}
        tags={postNode.tags}
        title={postNode.title}
        date={postNode.date}
        slug={postNode.slug}
        author={postNode.author}
      />
    }
    <div className="entry-content">
      <div
        dangerouslySetInnerHTML={{
          __html: postNode.content
        }}
      />
    </div>
    <Disqus postNode={postNode} />
  </div>
)

const BlogPost = ({ data }) => {
  const { wordpressPost: post } = data

  return (
    <Layout>
      <Helmet title={`${post.title} | Blog`} />
      <BlogPostTemplate
        postNode={post}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date(formatString: "MMMM DD, YYYY")
    title
  }
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
      date(formatString: "MMMM DD, YYYY")
      categories {
        name
        slug
      }
      tags {
        name
        slug
      }
      author {
        name
        slug
      }
    }
  }
`
