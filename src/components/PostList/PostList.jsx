import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styles from "./PostList.module.css"
import { PostHeader } from '../Headers/PostHeader/PostHeader'


export default class IndexPage extends React.Component {
  render() {
    const { posts, altTitle } = this.props

    return (
      <section className="section">
        <div className="container">
          <section className="content">
            {
              altTitle ? (
                <h1 className={`has-text-weight-bold is-size-2 ${styles.title}`}>
                  {altTitle}
                </h1>
              ) : (
                <React.Fragment>
                  <h1 className={`has-text-weight-bold is-size-2 ${styles.title}`}>WELCOME TO THE 1947PROJECT</h1>
                  <p>
                    Gentle reader, welcome to 1947project.
                    The site you’re visiting contains two years’ worth of blogging the crimes and oddities of 1907 and 1927,
                    plus occasional fresh historical Los Angeles inquiries, among them Nathan Marsak’s L.A. Noire gameplay blog.
                    If you’re looking for the original 1947project and crimes of that wild post-war year, click
                    <a className={styles.inLine_Link} href="http://1947project.blogspot.com"> here</a>
                    .
                  </p>
                  <p>
                    There are two other time travel blogs in the 1947project stable:
                    On Bunker Hill is a house-by-house survey, exploring the great lost downtown neighborhood of Bunker Hill from the 1880s to the 2000s.
                    Join us
                    <a className={styles.inLine_Link} href="https://www.onbunkerhill.org/"> On Bunker Hill </a>
                    to meet the people, homes and peculiarities that called the hill their own.
                    Can’t get enough of historic L.A. oddities? Then visit our other blog
                    <a className={styles.inLine_Link} href="https://insroland.org/"> In SRO Land </a>
                    , lost lore of the historic core.
                    Or for that personal touch, join us on an
                    <a className={styles.inLine_Link} href="https://esotouric.com/"> Esotouric </a>
                    bus adventure into the secret heart of Los Angeles.
                  </p>
                </React.Fragment>
              )}
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
  fragment PostListFields on wordpress__POST {
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
