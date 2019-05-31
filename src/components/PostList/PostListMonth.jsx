import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styles from "./PostList.module.css"
import { PostHeader } from '../Headers/PostHeader/PostHeader'
import { months } from '../Helpers/DateMappings'


export default class IndexPage extends React.Component {
  render() {
    const { posts } = this.props

    const date = new Date(posts[0].node.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1

    return (
      <section className="section">
        <div className="container">
          <section className="content">
            <h1 className={`has-text-weight-bold is-size-2 ${styles.title}`}>
              MONTHLY ARCHIVES: {`${months[month]} ${year}`}
            </h1>
          </section>
          {posts.map(({ node: post }) => (
              <PostHeader
                key={post.id}
                id={post.id}
                content={post.content}
                categories={post.categories}
                tags={post.tags}
                title={post.title}
                date={post.date}
                slug={post.slug}
                author={post.author}
              />
            ))}
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
}

export const pageQuery = graphql`
  fragment PostListFields2 on wordpress__POST {
    id
    title
    content
    author {
      name
      slug
      avatar_urls {
        wordpress_48
      }
    }
    categories {
      id
      name
      slug
    }
    tags {
      id
      name
      slug
    }
    date(formatString: "MMMM DD, YYYY")
    slug
  }
`
