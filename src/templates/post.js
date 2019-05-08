import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import { PostHeader } from '../components/Headers/PostHeader/PostHeader';

export const BlogPostTemplate = ({
  id,
  content,
  categories,
  tags,
  title,
  date,
  slug,
  author,
}) => (
  <div className="content">
    {
      <PostHeader 
        id={id}
        content={content}
        categories={categories}
        tags={tags}
        title={title}
        date={date}
        slug={slug}
        author={author}
      />
    }
    <div className="entry-content">
      <div
        dangerouslySetInnerHTML={{
          __html: content
        }}
      />
    </div>
  </div>
)

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { wordpressPost: post } = data

  return (
    <Layout>
      <Helmet title={`${post.title} | Blog`} />
      <BlogPostTemplate
        content={post.content}
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        date={post.date}
        author={post.author}
        id={post.id}
        slug={post.slug}
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
